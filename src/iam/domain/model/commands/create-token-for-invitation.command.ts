export class CreateTokenForInvitationCommand {
  public readonly institutionId: number;
  public readonly jti: string;

  constructor(institutionId: number, jti: string) {
    this.institutionId = institutionId;
    this.jti = jti;
  }
}