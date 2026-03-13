export class CreateEmailAccountCommand {
  constructor(
    public readonly emailAddress: string,
    public readonly encryptedPassword: string,
  ) {}
}

