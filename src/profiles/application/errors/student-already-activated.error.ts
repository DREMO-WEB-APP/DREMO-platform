import {ApplicationError} from "../../../shared/application/errors/application.error";


export class StudentAlreadyActivatedError extends ApplicationError{
    readonly code = 'PROFILES_STUDENT_ALREADY_ACTIVATED';
    readonly publicMessage = 'El perfil del estudiante ya se encuentra activo';

    constructor(studentId: number) {
        super(`student profile with ID ${studentId} is already activated`);
    }

}