import {ApplicationError} from "../../../shared/application/errors/application.error";


export class StudentProfileNotFoundError extends ApplicationError{
    readonly code = 'PROFILES_STUDENT_PROFILE_NOT_FOUND';
    readonly publicMessage = 'Perfil de estudiante no encontrado';
    constructor(studentId: number) {
        super(`No se encontró un perfil de estudiante con ID ${studentId}`);
    }
}