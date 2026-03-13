import { Request } from "../model/aggregates/Request";
import {ReviewRequestCommand} from "../model/commands/review-request.command";

export interface IRequestCommandService {

  createRequest(studentId: number): Promise<Request>;


  deleteRequest(requestId: number): Promise<void>;


  reviewRequest(command: ReviewRequestCommand): Promise<Request>;
}

