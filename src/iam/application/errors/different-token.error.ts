import {ApplicationError} from "../../../shared/application/errors/application.error";


export class DifferentTokenError extends ApplicationError {
  readonly code = 'IAM_DIFFERENT_TOKEN';
  readonly publicMessage = 'El token proporcionado no coincide';
  constructor() {
    super('Token mismatch');
  }
}
