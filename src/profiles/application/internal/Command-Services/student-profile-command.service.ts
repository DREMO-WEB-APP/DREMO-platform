import {Inject, Injectable} from "@nestjs/common";
import {IStudentProfileCommandServices} from "../../../domain/services/i-student-profile-command-services";
import {STUDENT_PROFILE_REPOSITORY_TOKEN} from "../../../domain/repositories/student-profile-repository.token";
import {IStudentProfileRepository} from "../../../domain/repositories/i-student-profile-repository";
import {Student} from "../../../domain/model/aggregates/student";
import { CreateStudentWithAccountCommand } from "src/profiles/domain/model/commands/create-student-with-account.command";
import { UpdateStudentCommand } from "src/profiles/domain/model/commands/update-student.command";
import {ExternalIamService} from "../outbound-services/external-iam.service";
import {DniValidatorService} from "../../../infrastructure/dni/services/dni-validator.service";
import {DniProfileExistsError} from "../../errors/dni-profile.exists.error";
import {NotMatchReniecError} from "../../errors/not-match-reniec.error";
import {StudentProfileNotFoundError} from "../../errors/student-profile-not-found.error";
import {StudentAlreadyActivatedError} from "../../errors/student-already-activated.error";
import {ExternalEmailAccountService} from "../outbound-services/external-email-account.service";
import {StudentEmailAccountNotValidError} from "../../errors/student-email-account-not-valid.error";
import {ExternalInstituteService} from "../outbound-services/external-institute.service";
import {ActivateEmailAccountCommand} from "../../../../emails/domain/model/commands/activate-email-account.command";
import {EmailAccount} from "../../../../emails/domain/model/aggregates/EmailAccount";
import {GoogleEmailProvisioner} from "../../../../emails/infrastructure/email-service/gmail/google-email-provisioner";
import {EventBus} from "@nestjs/cqrs";
import {StudentProfileCreatedEvent} from "../../../domain/model/events/student-profile-created.event";


@Injectable()
export class StudentProfileCommandService implements IStudentProfileCommandServices {
    constructor(
        @Inject(STUDENT_PROFILE_REPOSITORY_TOKEN)
        private readonly studentProfileRepository: IStudentProfileRepository<Student>,
        @Inject()
        private readonly dniValidatorService : DniValidatorService,
        private readonly externalIamService: ExternalIamService,
        private readonly externalEmailAccountService: ExternalEmailAccountService,
        private readonly externalInstituteService: ExternalInstituteService,
        private readonly eventBus:EventBus,
    ) {
    }

    async handleCreateStudentProfile(command: CreateStudentWithAccountCommand): Promise<Student> {
        if (await this.studentProfileRepository.findByDniAsync(command.dni)) {
            throw new DniProfileExistsError(command.dni);
        }

        const foundInstitute = await this.externalInstituteService.getInstituteById(command.instituteId);
        if (!foundInstitute) {
            throw new Error(`Institute with id ${command.instituteId} does not exist.`);
        }

        const nombres = command.names;
        const [apellidoPaterno, apellidoMaterno] = command.lastNames.split(' ', 2);

        const esValido = await this.dniValidatorService.validarDniConNombres(
            command.dni,
            nombres,
            apellidoPaterno ?? '',
            apellidoMaterno ?? '',
        );

        if (!esValido) {
            throw new NotMatchReniecError();
        }

        let accountId: number | null = null;
        try {
            accountId = await this.externalIamService.createAccount(
                command.username,
                command.password,
                'student',
            );

            const studentProfile: Student = Student.constructStudentFromCommand(command, accountId);

            studentProfile.institute =foundInstitute;

            const persistedStudentProfile = await this.studentProfileRepository.addAsync(studentProfile);
            this.eventBus.publish( new StudentProfileCreatedEvent(
                persistedStudentProfile.id,
                persistedStudentProfile.dni,
                persistedStudentProfile.institute.UGEL
                )
            )
            return persistedStudentProfile;
        } catch (error) {
            if (accountId) {
                await this.externalIamService.deleteAccount(accountId);
            }
            throw error;
        }
    }

    async handleActiveStudentProfile(studentId:number): Promise<Student> {
        const studentFound:Student= await this.studentProfileRepository.findCompleteProfileByStudentIdAsync(studentId);

        if (!studentFound) {
            throw new StudentProfileNotFoundError(studentId);
        }

        if (studentFound.userStatus === 'ACTIVE') {
            throw new StudentAlreadyActivatedError(studentId)
        }

        if(!studentFound.emailAccount){
            //TODO: definir mejor este error, porque el perfil de estudiante se creo sin cuenta de correo, entonces no se puede activar el perfil de estudiante
            throw new StudentEmailAccountNotValidError();
        }

        const command =  new ActivateEmailAccountCommand(studentFound.emailAccount.emailAddress, studentFound.emailAccount.encryptedPassword,studentFound.names, studentFound.lastNames);
        
        await this.externalEmailAccountService.activateEmailAccount(command);
        studentFound.ActivateStudentProfile();
        await this.studentProfileRepository.updateAsync(studentFound);
        return studentFound;
    }

    async hanldeActiveStudentProfileWithOutEmail(studentId: number): Promise<Student> {
        const studentFound:Student= await this.studentProfileRepository.findCompleteProfileByStudentIdAsync(studentId);
        if (!studentFound) {
            throw new StudentProfileNotFoundError(studentId);
        }
        if (studentFound.userStatus === 'ACTIVE') {
            throw new StudentAlreadyActivatedError(studentId)
        }

        if(!studentFound.emailAccount){
            //TODO: definir mejor este error, porque el perfil de estudiante se creo sin cuenta de correo, entonces no se puede activar el perfil de estudiante
            throw new StudentEmailAccountNotValidError();
        }

        studentFound.ActivateStudentProfile();
        await this.studentProfileRepository.updateAsync(studentFound);
        return studentFound;
    }

    async handleUpdateStudentEmailAddress(studentId: number, email: EmailAccount): Promise<string | null> {

        if (!email) {
            throw new StudentEmailAccountNotValidError();
        }
        const studentProfile = await this.studentProfileRepository.findByStudentIdAsync(studentId);
        if (!studentProfile) {
            throw new StudentProfileNotFoundError(studentId);
        }

        studentProfile.emailAccount= email;
        await this.studentProfileRepository.updateAsync(studentProfile);
        return "Email account updated successfully";
    }

    handleDeleteStudentProfile(studentId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    handleUpdateStudentProfile(command: UpdateStudentCommand): Promise<Student> {
        throw new Error("Method not implemented.");
    }
}