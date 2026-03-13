

export class RequestReviewedEvent{
    constructor(
        public readonly requestId: number,
        public readonly studentId: number,
        public readonly adminId: number,
        public readonly response: string,
        public readonly comment?: string,
    ) {}

}