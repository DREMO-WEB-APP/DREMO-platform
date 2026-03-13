
export class ActivateEmailAccountCommand{

    constructor(
        public readonly emailAddress: string,
        public readonly encryptedPassword: string,
        public readonly firstName: string,
        public readonly lastName: string,
    ) {}
}