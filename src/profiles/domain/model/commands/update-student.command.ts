export class UpdateStudentCommand {
  // Identificador del estudiante a actualizar
  studentId: number;

  // Campos actualizables
  names?: string;
  lastNames?: string;

  // Opcionalmente, actualizar referencia a la cuenta
  accountId?: number;

  dni?: string;

  constructor(params: {
    studentId: number;
    names?: string;
    lastNames?: string;
    accountId?: number;
    dni?: string;
  }) {
    this.studentId = params.studentId;
    this.names = params.names;
    this.lastNames = params.lastNames;
    this.accountId = params.accountId;
    this.dni = params.dni;
  }
}

