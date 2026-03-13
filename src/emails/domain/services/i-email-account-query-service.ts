import {EmailAccount} from "../model/aggregates/EmailAccount";


export interface IEmailAccountQueryService{

    getByEmailAccountId(emailAccountId: number): Promise<EmailAccount>;
    getByEmailAddress(emailAddress: string): Promise<EmailAccount>;
    getByDni(dni: string): Promise<EmailAccount>;

}