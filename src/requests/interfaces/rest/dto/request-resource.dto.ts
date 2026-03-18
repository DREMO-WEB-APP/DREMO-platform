import {RequestStatus} from "../../../domain/model/value-objects/RequestStatus";
import {Request} from "../../../domain/model/aggregates/Request";
import {Admin} from "../../../../profiles/domain/model/aggregates/Admin";

export class RequestResourceDto {
  id: number;
  studentId: number;
  status: RequestStatus;
  requestDate: Date;
  reviewedBy: Admin;
  comment?: string | null;
  reviewedAt?: Date | null;

  static fromAggregate(request: Request): RequestResourceDto {
    const dto = new RequestResourceDto();
    dto.id = request.id;
    dto.studentId = request.studentId;
    dto.status = request.status;
    dto.requestDate = request.requestDate;
    dto.reviewedBy = request.reviewedBy;
    dto.comment = request.comment ?? null;
    dto.reviewedAt = request.reviewedAt ?? null;
    return dto;
  }
}