import {ApplicationError} from "../../../shared/application/errors/application.error";


export class AccountNotFoundError extends ApplicationError {

    readonly code = 'IAM_ACCOUNT_NOT_FOUND';
    readonly publicMessage = 'Cuenta no encontrada';
  constructor() {
    super('Account not found');
  }
}
