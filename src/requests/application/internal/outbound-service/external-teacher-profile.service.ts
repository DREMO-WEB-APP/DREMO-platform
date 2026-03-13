import {Inject, Injectable} from "@nestjs/common";
import {TeacherContextFacadeService} from "../../../../profiles/interfaces/acl/teacher-context-facade.service";


@Injectable()
export class ExternalTeacherProfileService {

    constructor(
        @Inject()
        private readonly teacherContextFacadeService: TeacherContextFacadeService) {

    }

    public async teacherProfileExistsById(teacherId: number): Promise<boolean> {
        return await this.teacherContextFacadeService.teacherExistsById(teacherId);
    }

    public async getTeacherProfileById(teacherId: number) {
            return await this.teacherContextFacadeService.getTeacherProfileById(teacherId);
    }


}