import {ApplicationError} from "../../../shared/application/errors/application.error";


export class AdminProfileNotFoundError extends ApplicationError{

    readonly code = 'PROFILES_ADMIN_PROFILE_NOT_FOUND';
    readonly publicMessage = 'Perfil de administrador no encontrado';

    constructor(adminId: number) {
        super("admin profile not found with ID " + adminId);
    }

}