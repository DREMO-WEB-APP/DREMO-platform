import {ApplicationError} from "../../../shared/application/errors/application.error";


export class EmailNotFoundError extends ApplicationError{
    readonly code = 'EMAILS_EMAIL_NOT_FOUND';
    readonly publicMessage= 'Correo electrónico no encontrado';
    constructor(emailId: number) {
        super( "Email with the ID " + emailId + " was not found");
    }
}