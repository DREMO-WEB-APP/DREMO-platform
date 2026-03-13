export class CreateAdminWithAccountCommand {

    username: string;
    password: string;


    constructor(params:{
            username: string;
            password: string;
    }) {
        this.username = params.username;
        this.password = params.password;
    }


}