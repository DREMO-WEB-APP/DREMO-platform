import {ApplicationError} from "../../../shared/application/errors/application.error";


export class InvalidInvitationTokenError extends ApplicationError {

    readonly code = 'INVALID_INVITATION_TOKEN';
    readonly publicMessage = 'La invitacion usa un token invalido';

  constructor() {
    super('invitation token is invalid');
  }

}