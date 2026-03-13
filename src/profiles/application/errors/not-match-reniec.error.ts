import {ApplicationError} from "../../../shared/application/errors/application.error";

export class NotMatchReniecError extends ApplicationError{
    readonly code = 'PROFILES_NOT_MATCH_RENIEC';
    readonly publicMessage = 'Los datos no coinciden con RENIEC';

    constructor() {
        super('Los datos de DNI y nombres/apellidos no coinciden con RENIEC');
    }
}