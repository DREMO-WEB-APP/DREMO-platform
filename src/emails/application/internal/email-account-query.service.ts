import {Inject, Injectable} from "@nestjs/common";
import {IEmailAccountQueryService} from "../../domain/services/i-email-account-query-service";
import {EMAIL_ACCOUNT_REPOSITORY_TOKEN} from "../../domain/repositories/email-account-repository.token";
import {IEmailAccountRepository} from "../../domain/repositories/i-email-account-repository";
import {EmailAccount} from "../../domain/model/aggregates/EmailAccount";

@Injectable()
export class EmailAccountQueryService implements IEmailAccountQueryService {

    constructor(
        @Inject(EMAIL_ACCOUNT_REPOSITORY_TOKEN)
        private readonly emailAccountRepository: IEmailAccountRepository<EmailAccount>,
    ) {}

    getByEmailAccountId(emailAccountId: number): Promise<EmailAccount> {

        const foundEmailAccount = this.emailAccountRepository.findByIdAsync(emailAccountId);
        if(!foundEmailAccount){
            throw new Error(`No se encontró una cuenta de correo con el ID ${emailAccountId}`);
        }

        return foundEmailAccount;
    }

    getByEmailAddress(emailAddress: string): Promise<EmailAccount> {

        const foundEmailAccount = this.emailAccountRepository.findByEmailAddressAsync(emailAddress);
        if(!foundEmailAccount){
            throw new Error(`No se encontró una cuenta de correo con la dirección ${emailAddress}`);
        }

        return foundEmailAccount;
    }


    getByDni(dni: string): Promise<EmailAccount> {
        const foundEmailAccount = this.emailAccountRepository.findByDniAsync(dni);
        if(!foundEmailAccount){
            throw new Error(`No se encontró una cuenta de correo con el DNI ${dni}`);
        }
        return foundEmailAccount;
    }
}
