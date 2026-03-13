import {ApplicationError} from "../../../shared/application/errors/application.error";


export class UsernameExistsError extends ApplicationError {
  readonly code = 'IAM_USERNAME_EXISTS';
  readonly publicMessage = 'El nombre de usuario ya existe';
  constructor() {
    super('Username already exists');
  }
}
