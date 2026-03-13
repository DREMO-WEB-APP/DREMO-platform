import {Inject, Injectable} from "@nestjs/common";
import {IStudentProfileQueryService} from "../../../domain/services/i-student-profile-query-service";
import { Student } from "src/profiles/domain/model/aggregates/student";
import {IStudentProfileRepository} from "../../../domain/repositories/i-student-profile-repository";
import {STUDENT_PROFILE_REPOSITORY_TOKEN} from "../../../domain/repositories/student-profile-repository.token";
import {EmailsContextFacadeService} from "../../../../emails/interfaces/acl/emails-context-facade.service";
import {EmailAccount} from "../../../../emails/domain/model/aggregates/EmailAccount";
import {StudentProfileNotFoundError} from "../../errors/student-profile-not-found.error";
import {StudentAccountNotFoundError} from "../../errors/student-account-not-found.error";
import {ExternalInstituteService} from "../outbound-services/external-institute.service";



@Injectable()
export class StudentProfileQueryService implements IStudentProfileQueryService {

    constructor(
        @Inject(STUDENT_PROFILE_REPOSITORY_TOKEN)
        private readonly studentRepository: IStudentProfileRepository<Student>,
        @Inject()
        private readonly emailsContextFacadeService: EmailsContextFacadeService,
        private readonly externalInstituteService: ExternalInstituteService,
    ) {
    }

    async getStudentsByInstitute(instituteId: number): Promise<Student[]> {

        if(!await this.externalInstituteService.getInstituteById(instituteId)){
            throw new Error(`Institute with id ${instituteId} does not exist.`);
        }

        const students = await this.studentRepository.findByInstituteIdAsync(instituteId);

        for (const student of students) {
            const institute = await this.externalInstituteService.getInstituteById(student.instituteId);
            if (institute) {
                student.setInstitute(institute);
            }

            if(student.emailAccountId !== null){
                const emailFound:EmailAccount = await this.emailsContextFacadeService.obtainEmailById(student.emailAccountId);
                if (!emailFound) {
                    throw new Error(`Email account with id ${student.emailAccountId} does not exist for student with id ${student.id}.`);
                }
                student.emailAccount = emailFound;
            }
        }

        return students;
    }

    async getStudentById(studentId: number): Promise<Student> {

        const studentFound:Student= await this.studentRepository.findByStudentIdAsync(studentId);

        if(!studentFound){
            throw new StudentProfileNotFoundError(studentId);
        }


        const institute = await this.externalInstituteService.getInstituteById(studentFound.instituteId);
        if (!institute) {
            throw new Error(`Institute with id ${studentFound.instituteId} does not exist.`);
        }
        studentFound.setInstitute(institute);
        studentFound.emailAccount = await this.emailsContextFacadeService.obtainEmailAccountByDni(studentFound.dni);

        return studentFound;

    }
    async getAllStudents(): Promise<Student[]> {
        const students = await this.studentRepository.findAllStudentProfilesAsync();

        for (const student of students) {
            if (student.instituteId && !isNaN(student.instituteId)) {
                const institute = await this.externalInstituteService.getInstituteById(student.instituteId);
                if (institute) {
                    student.setInstitute(institute);
                }
            }

                if(student.emailAccountId !== null){
                    const emailFound:EmailAccount = await this.emailsContextFacadeService.obtainEmailById(student.emailAccountId);
                    if (!emailFound) {
                        throw new Error(`Email account with id ${student.emailAccountId} does not exist for student with id ${student.id}.`);
                    }
                    student.emailAccount = emailFound;
                }
        }
        return students;
    }

    async getStudentByAccountId(accountId: number): Promise<Student> {
        const studentFound:Student= await this.studentRepository.findByAccountIdAsync(accountId);

        if(!studentFound){
            throw new StudentAccountNotFoundError(accountId);
        }

        const institute = await this.externalInstituteService.getInstituteById(studentFound.instituteId);
        if (!institute) {
            throw new Error(`Institute with id ${studentFound.instituteId} does not exist.`);
        }

        studentFound.setInstitute(institute);
        studentFound.emailAccount = await this.emailsContextFacadeService.obtainEmailAccountByDni(studentFound.dni);
        return studentFound;
    }
}