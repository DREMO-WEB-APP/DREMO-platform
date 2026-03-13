import {Inject, Injectable} from "@nestjs/common";
import {EmailsContextFacadeService} from "../../../../emails/interfaces/acl/emails-context-facade.service";
import {EmailAccount} from "../../../../emails/domain/model/aggregates/EmailAccount";
import {ActivateEmailAccountCommand} from "../../../../emails/domain/model/commands/activate-email-account.command";

@Injectable()
export class ExternalEmailAccountService {
    constructor(
        @Inject()
        private readonly emailService: EmailsContextFacadeService

    ) {
    }


    public async getEmailAccountByDni(dni: string): Promise<EmailAccount> {
        return await this.emailService.obtainEmailAccountByDni(dni);

    }

    public async activateEmailAccount(command: ActivateEmailAccountCommand): Promise<boolean> {

        return this.emailService.activateEmailAccount(command);

    }

}