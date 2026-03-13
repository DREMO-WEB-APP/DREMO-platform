import {ApplicationError} from "../../../shared/application/errors/application.error";


export class RoleNotFoundError extends ApplicationError {
  readonly code = 'IAM_ROLE_NOT_FOUND';
  readonly publicMessage = 'Rol no encontrado';
  constructor() {
    super('Role not found');
  }
}
