import {Inject, Injectable} from "@nestjs/common";
import {ITeacherProfileCommandService} from "../../../domain/services/i-teacher-profile-command-service";
import {TEACHER_PROFILE_REPOSITORY_TOKEN} from "../../../domain/repositories/teacher-profile-repository.token";
import {ITeacherProfileRepository} from "../../../domain/repositories/i-teacher-profile-repository";
import {Teacher} from "../../../domain/model/aggregates/teacher";
import { CreateTeacherWithAccountCommand } from "src/profiles/domain/model/commands/create-teacher-with-account.command";
import {DniValidatorService} from "../../../infrastructure/dni/services/dni-validator.service";
import {ExternalIamService} from "../outbound-services/external-iam.service";
import {NotMatchReniecError} from "../../errors/not-match-reniec.error";
import {ExternalInstituteService} from "../outbound-services/external-institute.service";
import {EventBus} from "@nestjs/cqrs";
import {
    CreateTeacherProfileFromInvitationCommand
} from "../../../domain/model/commands/create-teacher-profile-from-invitation.command";
import {InvitationQueryService} from "../Query-Services/invitation-query.service";
import {InvitationCommandService} from "./invitation-command.service";
import {InvalidInvitationTokenError} from "../../errors/invalid-invitation-token.error";
import {GetUsedInvitationByTokenIdQuery} from "../../../domain/model/queries/get-used-invitation-by-token-id.query";
import {DniProfileExistsError} from "../../errors/dni-profile.exists.error";
import {
    GenerateTeacherRegisterInvitationCommand
} from "../../../domain/model/commands/generate-teacher-register-invitation.command";
import {InvitationGeneratedEvent} from "../../../domain/model/events/invitation-generated.event";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TeacherProfileCommandService implements ITeacherProfileCommandService {

    constructor(
        @Inject(TEACHER_PROFILE_REPOSITORY_TOKEN)
        private readonly teacherProfileRepository: ITeacherProfileRepository<Teacher>,
        private readonly dniValidatorService: DniValidatorService,
        private readonly externalIamService: ExternalIamService,
        private readonly externalInstituteService: ExternalInstituteService,
        private readonly eventBus: EventBus,
        private readonly invitationCommandService: InvitationCommandService,
        private readonly invitationQueryService: InvitationQueryService
    ) {
    }


    async handleCreateTeacherProfile(command: CreateTeacherWithAccountCommand): Promise<Teacher> {
        const nombres = command.names;
        const [apellidoPaterno, apellidoMaterno] = command.lastNames.split(' ', 2);

        const esValido = await this.dniValidatorService.validarDniConNombres(
            command.dni,
            nombres,
            apellidoPaterno ?? '',
            apellidoMaterno ?? '',
        );

        if (!esValido) {
            throw new NotMatchReniecError()
        }

        const foundInstitute = await this.externalInstituteService.getInstituteById(command.instituteId);

        if (!foundInstitute) {
            throw new Error(`Institute with id ${command.instituteId} does not exist.`);

        }

        const accountId: number = await this.externalIamService.createAccount(
            command.username,
            command.password,
            'teacher',
        );

        const teacherProfile: Teacher = Teacher.constructTeacherFromCommand(command, accountId);

        teacherProfile.setInstitute(foundInstitute);

        return await this.teacherProfileRepository.addAsync(teacherProfile);

    }

    async handleDeleteTeacherProfile(teacherId: number): Promise<Teacher> {

        const foundTeacher = await this.teacherProfileRepository.findByTeacherIdAsync(teacherId);

        await this.teacherProfileRepository.deleteAsync(foundTeacher);

        return foundTeacher;
    }



    public async handleGenerateTeacherRegisterInvitation(command: GenerateTeacherRegisterInvitationCommand): Promise<string> {
        const jti = uuidv4();
        const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // expires in 24 hours

        const foundInstitute = await this.externalInstituteService.getInstituteById(command.institutionId);

        if( !foundInstitute){
            throw new Error(`Institute with id ${command.institutionId} does not exist.`);
        }
        await this.eventBus.publishAll([new InvitationGeneratedEvent(jti, expirationDate)])
        return await this.externalIamService.obtainInvitationUrl(command.institutionId, jti);

    }

    async handleCreateTeacherProfileFromInvitation(command: CreateTeacherProfileFromInvitationCommand): Promise<Teacher> {
        const getUsedInvitationQuery = new GetUsedInvitationByTokenIdQuery(command.invitationToken);

        const isTokenInvitationUsed = await this.invitationQueryService.getUsedInvitationByTokenId(getUsedInvitationQuery);
        const isTokenInvitationValid = await this.externalIamService.validateTokenInvitation(command.invitationToken);

        if (!isTokenInvitationValid) throw new InvalidInvitationTokenError();
        if (isTokenInvitationUsed) throw new InvalidInvitationTokenError();

        if (await this.teacherProfileRepository.findByDniAsync(command.dni)) {
            throw new DniProfileExistsError(command.dni);
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

        const { institutionId, jti } = await this.externalIamService.obtainInformationFromTokenInvitation(command.invitationToken);

        const foundInstitute = await this.externalInstituteService.getInstituteById(institutionId);

        if (!foundInstitute) {
            throw new Error(`Institute with id ${institutionId} does not exist.`);
        }

        let accountId: number | null = null;
        try {
            accountId = await this.externalIamService.createAccount(
                command.username,
                command.password,
                'teacher',
            );

            const createTeacherProfileCommand = {
                ...command,
                instituteId: institutionId
            };

            const teacherProfile: Teacher = Teacher.constructTeacherFromCommand(createTeacherProfileCommand, accountId);

            teacherProfile.setInstitute(foundInstitute);
            teacherProfile.accountId = accountId;
            await this.invitationCommandService.markAsUsed(jti);

            return await this.teacherProfileRepository.addAsync(teacherProfile);
        } catch (error) {
            if (accountId) {
                await this.externalIamService.deleteAccount(accountId);
            }
            throw error;
        }
    }





}