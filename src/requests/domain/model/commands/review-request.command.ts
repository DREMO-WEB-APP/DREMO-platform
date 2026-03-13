import {RequestStatus} from "../value-objects/RequestStatus";

export class ReviewRequestCommand {
  constructor(
    public readonly requestId: number,
    public readonly teacherId: number,
    public readonly response: RequestStatus,
    public readonly comment: string,
  ) {}
}

