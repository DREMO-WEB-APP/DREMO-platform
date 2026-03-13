import {Inject, Injectable} from "@nestjs/common";
import {StudentProfileQueryService} from "../../application/internal/Query-Services/student-profile-query.service";
import {Student} from "../../domain/model/aggregates/student";
import {
    StudentProfileCommandService
} from "../../application/internal/Command-Services/student-profile-command.service";
import {EmailAccount} from "../../../emails/domain/model/aggregates/EmailAccount";

@Injectable()
export class StudentContextFacadeService {

    constructor(
        @Inject()
        private readonly studentProfileCommandService: StudentProfileCommandService,
        @Inject()
        private readonly  studentProfileQueryService: StudentProfileQueryService,

    ) {
    }


    public async StudentProfileExistsById(studentId: number): Promise<boolean> {
        const studentProfile = await this.studentProfileQueryService.getStudentById(studentId);
        return !!studentProfile;
    }

    public async GetStudentProfileById(studentId: number): Promise<Student> {
        return await this.studentProfileQueryService.getStudentById(studentId);
    }

    public async UpdateStudentEmail(studentId: number, emailAccount: EmailAccount): Promise<void> {
        await this.studentProfileCommandService.handleUpdateStudentEmailAddress(studentId, emailAccount);
    }

    public async ActivateStudentProfile(studentId: number): Promise<void> {
        await this.studentProfileCommandService.hanldeActiveStudentProfileWithOutEmail(studentId);
    }




}