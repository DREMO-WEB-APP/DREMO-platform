import { Request } from "../model/aggregates/Request";

export interface IRequestQueryService {

  getById(requestId: number): Promise<Request | null>;


  getByStudentId(studentId: number): Promise<Request | null>;


  getAll(): Promise<Request[]>;
}

