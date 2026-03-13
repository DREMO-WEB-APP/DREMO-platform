

export class CreateTeacherProfileFromInvitationCommand{
    public readonly invitationToken: string;
    username: string;
    password: string;
    names: string;
    lastNames: string;
    dni: string;

    constructor(
        data: {
            invitationToken: string;
            username: string;
            password: string;
            names: string;
            lastNames: string;
            dni: string;
        },
    ) {
        this.invitationToken = data.invitationToken;
        this.username = data.username;
        this.password = data.password;
        this.names = data.names;
        this.lastNames = data.lastNames;
        this.dni = data.dni;
    }
}