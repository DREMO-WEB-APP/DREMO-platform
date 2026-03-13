import {ApplicationError} from "../../../shared/application/errors/application.error";


export class InvitationDoesNotExistsError extends ApplicationError {

    readonly code = "INVITATION_DOES_NOT_EXIST";
    readonly publicMessage = "La invitacion no existe";

  constructor() {
    super('Invitation does not exist');
  }
}