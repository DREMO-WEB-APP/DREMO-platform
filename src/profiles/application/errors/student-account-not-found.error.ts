import {ApplicationError} from "../../../shared/application/errors/application.error";


export class StudentAccountNotFoundError extends ApplicationError{

    readonly code = 'PROFILES_STUDENT_ACCOUNT_NOT_FOUND';
    readonly publicMessage = 'Cuenta de estudiante no encontrada';

    constructor(accountId: number) {
        super( "student account not found with ID " + accountId);
    }
}