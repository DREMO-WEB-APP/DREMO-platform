import {ApplicationError} from "../../../shared/application/errors/application.error";


export class InvalidTokenError extends ApplicationError {
  readonly code = 'IAM_INVALID_TOKEN';
  readonly publicMessage = 'Token inválido';
  constructor() {
    super('Invalid token');
  }
}
