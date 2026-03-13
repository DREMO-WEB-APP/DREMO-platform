import {IEmailAccountCommandService} from "../services/i-email-account-command-service";
import {IBaseRepository} from "../../../shared/domain/repositories/i-base-repository";


export interface IEmailAccountRepository<EmailAccount> extends IBaseRepository<EmailAccount>{

    findByEmailAddressAsync(emailAddress: string): Promise<EmailAccount>;
    findByDniAsync(dni: string): Promise<EmailAccount>;


}