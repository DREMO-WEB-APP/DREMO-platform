import {IBaseRepository} from "../../../shared/domain/repositories/i-base-repository";
import {Student} from "../model/aggregates/student";

export interface IStudentProfileRepository<StudentProfile> extends IBaseRepository<Student> {

    findByStudentIdAsync(studentId: number): Promise<StudentProfile>;
    findByDniAsync(dni: string): Promise<StudentProfile>;
    findAllStudentProfilesAsync(): Promise<StudentProfile[]>;
    findByAccountIdAsync(accountId: number): Promise<StudentProfile>;
    findByInstituteIdAsync(instituteId: number): Promise<StudentProfile[]>;

    findByStudentIdWithInstituteAsync(studentId: number): Promise<StudentProfile>;
    findCompleteProfileByStudentIdAsync(studentId: number): Promise<StudentProfile>;

}