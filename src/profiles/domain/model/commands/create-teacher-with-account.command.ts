export class CreateTeacherWithAccountCommand{
    // Datos de la cuenta
    username: string;
    password: string;

    // Datos del docente
    names: string;
    lastNames: string;

    dni: string;

    instituteId: number;


    constructor(params: {
        username: string;
        password: string;
        names: string;
        lastNames: string;
        dni: string;
        instituteId: number;
    }) {
        this.username = params.username;
        this.password = params.password;
        this.names = params.names;
        this.lastNames = params.lastNames;
        this.dni = params.dni;
        this.instituteId = params.instituteId;
    }
}