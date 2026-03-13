import {ApplicationError} from "../../../shared/application/errors/application.error";


export class InvalidPasswordError extends ApplicationError {
  readonly code = 'IAM_INVALID_PASSWORD';
  readonly publicMessage = 'Contraseña inválida';
  constructor() {
    super('Invalid password');
  }
}
