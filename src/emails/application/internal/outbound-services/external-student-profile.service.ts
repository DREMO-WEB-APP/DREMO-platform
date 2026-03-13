import {Inject, Injectable} from "@nestjs/common";
import {StudentContextFacadeService} from "../../../../profiles/interfaces/acl/student-context-facade.service";


@Injectable()
export class ExternalStudentProfileService {

    constructor(
        @Inject()
        private readonly studentProfileContextFacade: StudentContextFacadeService
    ) {
    }

    public async studentProfileExistsById(studentId: number): Promise<boolean> {
        return await this.studentProfileContextFacade.StudentProfileExistsById(studentId);
    }

    public async getStudentProfileById(studentId: number) {
        return await this.studentProfileContextFacade.GetStudentProfileById(studentId);

    }

    public async updateStudentEmail(studentId: number, emailAccount: any): Promise<void> {
        await this.studentProfileContextFacade.UpdateStudentEmail(studentId, emailAccount);
    }

    public async activateStudentProfile(studentId: number): Promise<void> {
        await this.studentProfileContextFacade.ActivateStudentProfile(studentId);
    }
}