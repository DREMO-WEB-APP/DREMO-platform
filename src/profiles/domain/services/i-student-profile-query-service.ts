import {Student} from "../model/aggregates/student";

export interface IStudentProfileQueryService {
    getStudentById(studentId:number): Promise<Student>;
    getAllStudents(): Promise<Student[]>;
    getStudentsByInstitute(instituteId: number): Promise<Student[]>;
}