import {UserStatus} from "../../../domain/model/value-objects/UserStatus";
import {Teacher} from "../../../domain/model/aggregates/teacher";

export class TeacherResourceWithInstituteResourceDto{

    id: number;
    createdAt: Date;
    updatedAt: Date;
    userStatus: UserStatus;

    instituteId: number;
    accountId: number;
    dni: string;
    names: string;
    lastNames: string;
    institute: string;

    static fromEntity(teacher: Teacher, instituteId:number): TeacherResourceWithInstituteResourceDto {
        const dto = new TeacherResourceWithInstituteResourceDto();
        dto.id = teacher.id;
        dto.instituteId = instituteId;
        dto.createdAt = teacher.createdAt;
        dto.updatedAt = teacher.updatedAt;
        dto.userStatus = teacher.userStatus;
        dto.accountId = teacher.accountId;
        dto.dni = teacher.dni;
        dto.names = teacher.names;
        dto.lastNames = teacher.lastNames;
        dto.institute = teacher.institute.name;
        return dto;
    }
}