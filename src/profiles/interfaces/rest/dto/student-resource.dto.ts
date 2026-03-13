import { Student } from "../../../domain/model/aggregates/student";
import { UserStatus } from "../../../domain/model/value-objects/UserStatus";
import {EmailAccount} from "../../../../emails/domain/model/aggregates/EmailAccount";

export class StudentResourceDto {
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

  static fromEntity(student: Student): StudentResourceDto {
    const dto = new StudentResourceDto();
    dto.id = student.id;
    dto.createdAt = student.createdAt;
    dto.updatedAt = student.updatedAt;
    dto.userStatus = student.userStatus;
    dto.accountId = student.accountId;
    dto.dni = student.dni;
    dto.names = student.names;
    dto.lastNames = student.lastNames;
    dto.institute = student.institute.name;
    dto.email = student.emailAccount ? student.emailAccount.emailAddress : null;
    return dto;
  }
}

