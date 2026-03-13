import {EmailAccount} from "../model/aggregates/EmailAccount";


export class EmailAccountCreatedEvent{
    constructor(
        public readonly email: EmailAccount,
        public readonly studentId: number,

    ) {
    }
}