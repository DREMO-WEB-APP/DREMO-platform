import { Request } from "../model/aggregates/Request";
import {IBaseRepository} from "../../../shared/domain/repositories/i-base-repository";

export interface IRequestRepository<Request> extends IBaseRepository<Request> {
  findByStudentIdAsync(studentId: number): Promise<Request>;
  findAllRequestAsync(): Promise<Request[]>;
  findAllPendingRequestsAsync(): Promise<Request[]>;
}

