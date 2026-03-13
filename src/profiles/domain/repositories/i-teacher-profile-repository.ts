import {IBaseRepository} from "../../../shared/domain/repositories/i-base-repository";
import {Teacher} from "../model/aggregates/teacher";


export interface ITeacherProfileRepository<Teacher> extends IBaseRepository<Teacher> {

    findByTeacherIdAsync(teacherId: number): Promise<Teacher>;
    findByDniAsync(dni: string): Promise<Teacher>;
    findAllTeacherProfilesAsync(): Promise<Teacher[]>;
    findByAccountIdAsync(accountId: number): Promise<Teacher>;
    findByInstituteIdAsync(instituteId: number): Promise<Teacher[]>;
}