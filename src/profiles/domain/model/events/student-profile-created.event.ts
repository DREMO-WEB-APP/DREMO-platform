
export class StudentProfileCreatedEvent{
    constructor(
        public readonly studentId: number,
        public readonly dni: string,
        public readonly ugel: string,

    ) {
    }
}