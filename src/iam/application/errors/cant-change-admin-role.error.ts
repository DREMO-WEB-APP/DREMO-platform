import {ApplicationError} from "../../../shared/application/errors/application.error";


export class CantChangeAdminRoleError extends ApplicationError {
  readonly code = 'IAM_CANT_CHANGE_ADMIN_ROLE';
  readonly publicMessage = 'No se puede cambiar el rol de administrador';
  constructor() {
    super('Cannot change admin role');
  }
}
