import {CreateTeacherWithAccountCommand} from "../model/commands/create-teacher-with-account.command";
import {Teacher} from "../model/aggregates/teacher";


export interface ITeacherProfileCommandService{

    handleCreateTeacherProfile(command: CreateTeacherWithAccountCommand): Promise<Teacher>;
    handleDeleteTeacherProfile(teacherId: number): Promise<Teacher>;
}