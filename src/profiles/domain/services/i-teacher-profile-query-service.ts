import {Teacher} from "../model/aggregates/teacher";
import {GetInvitationInformationQuery} from "../model/queries/get-invitation-information.query";


export interface ITeacherProfileQueryService{

    getTeacherById(teacherId:number): Promise<Teacher>;
    getTeachersByInstitute(instituteId: number): Promise<Teacher[]>;
    handleGetInvitationTokenVerification(query: GetInvitationInformationQuery): Promise<string>

}