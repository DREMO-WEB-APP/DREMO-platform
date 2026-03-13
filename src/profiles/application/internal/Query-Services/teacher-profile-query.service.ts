import {Inject, Injectable} from "@nestjs/common";
import {ITeacherProfileQueryService} from "../../../domain/services/i-teacher-profile-query-service";
import {TEACHER_PROFILE_REPOSITORY_TOKEN} from "../../../domain/repositories/teacher-profile-repository.token";
import {ITeacherProfileRepository} from "../../../domain/repositories/i-teacher-profile-repository";
import {Teacher} from "../../../domain/model/aggregates/teacher";
import {ExternalInstituteService} from "../outbound-services/external-institute.service";
import {ExternalIamService} from "../outbound-services/external-iam.service";
import {GetInvitationInformationQuery} from "../../../domain/model/queries/get-invitation-information.query";

@Injectable()
export class TeacherProfileQueryService implements ITeacherProfileQueryService{

    constructor(
        @Inject(TEACHER_PROFILE_REPOSITORY_TOKEN)
        private readonly teacherProfileRepository : ITeacherProfileRepository<Teacher>,
        private readonly externalInstituteService: ExternalInstituteService,
        private readonly externalIamService: ExternalIamService,

    ) {
    }

    async getTeacherById(teacherId: number): Promise<Teacher> {
        return await this.teacherProfileRepository.findByTeacherIdAsync(teacherId);
    }

    async getTeacherProfileByAccountId(accountId: number): Promise<{teacher: Teacher, instituteId: number}> {
        const foundTeacher =  await this.teacherProfileRepository.findByAccountIdAsync(accountId);

        const institute = await this.externalInstituteService.getInstituteById(foundTeacher.instituteId);
        if(!institute){
            throw new Error(`Institute with id does not exist.`);
        }
        foundTeacher.setInstitute(institute);

        return {
            teacher: foundTeacher,
            instituteId: institute.id}
    }

    async getTeachersByInstitute(instituteId: number): Promise<Teacher[]> {
        throw new Error("Method not implemented.");
    }

    async handleGetInvitationTokenVerification(query: GetInvitationInformationQuery): Promise<string>{
        if(await this.externalIamService.validateTokenInvitation(query.token)){
            return "valid";
        }

    }

}