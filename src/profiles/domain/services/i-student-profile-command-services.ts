import {CreateStudentWithAccountCommand} from "../model/commands/create-student-with-account.command";
import {Student} from "../model/aggregates/student";
import {UpdateStudentCommand} from "../model/commands/update-student.command";
import {EmailAccount} from "../../../emails/domain/model/aggregates/EmailAccount";

export interface IStudentProfileCommandServices{
    handleCreateStudentProfile(command: CreateStudentWithAccountCommand): Promise<Student>;
    handleDeleteStudentProfile(studentId: string): Promise<void>;
    handleUpdateStudentProfile(command: UpdateStudentCommand): Promise<Student>;
    handleUpdateStudentEmailAddress(studentId: number, email:EmailAccount): Promise<string | null>;
}