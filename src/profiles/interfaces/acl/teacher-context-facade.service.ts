import {Inject, Injectable} from "@nestjs/common";
import {TeacherProfileQueryService} from "../../application/internal/Query-Services/teacher-profile-query.service";

@Injectable()
export class TeacherContextFacadeService{

    constructor(
        @Inject()
        private readonly teacherProfileQueryService:TeacherProfileQueryService
    ) {
    }


    public async teacherExistsById(teacherId: number): Promise<boolean> {

        const teacherProfile = await this.teacherProfileQueryService.getTeacherById(teacherId);
        return !!teacherProfile;
    }

    public async getTeacherProfileById(teacherId: number) {

        return await this.teacherProfileQueryService.getTeacherById(teacherId);
    }


}