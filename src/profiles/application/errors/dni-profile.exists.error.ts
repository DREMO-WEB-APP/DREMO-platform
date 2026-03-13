import {ApplicationError} from "../../../shared/application/errors/application.error";


export class DniProfileExistsError extends ApplicationError {
    readonly code = 'PROFILES_DNI_PROFILE_EXISTS';
    readonly publicMessage = 'El DNI ya se encuentra en uso';
    constructor(dni: string) {
        super(`el DNI ${dni} ya se encuentra en uso`);
    }

}