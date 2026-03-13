import {ApplicationError} from "../../../shared/application/errors/application.error";


export class StudentEmailAccountNotValidError extends ApplicationError{

    readonly code = 'STUDENT_EMAIL_ACCOUNT_NOT_VALID';
    readonly publicMessage = 'La cuenta de correo electrónico no es válida para la creación del perfil de estudiante';

    constructor() {
        super(`The email account is not valid for student profile creation.`);
    }
}