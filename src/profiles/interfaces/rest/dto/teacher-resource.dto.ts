import {UserStatus} from "../../../domain/model/value-objects/UserStatus";
import {Student} from "../../../domain/model/aggregates/student";
import {Teacher} from "../../../domain/model/aggregates/teacher";

export class TeacherResourceDto{

    id: number;
    createdAt: Date;
    updatedAt: Date;
    userStatus: UserStatus;

    accountId: number;
    dni: string;
    names: string;
    lastNames: string;
    institute: string;
    email?: string | null;

    static fromEntity(teacher: Teacher): TeacherResourceDto {
        const dto = new TeacherResourceDto();
        dto.id = teacher.id;
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