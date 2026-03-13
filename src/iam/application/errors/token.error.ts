import {ApplicationError} from "../../../shared/application/errors/application.error";


export class TokenError extends ApplicationError {
  readonly code = 'IAM_TOKEN_ERROR';
  readonly publicMessage = 'Token inválido o expirado';
  constructor(error?: any) {
    super(error?.message || 'Invalid or expired token');
  }
}
