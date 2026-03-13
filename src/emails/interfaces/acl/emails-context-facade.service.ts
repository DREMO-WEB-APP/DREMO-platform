import {Inject, Injectable} from "@nestjs/common";
import {EmailAccountQueryService} from "../../application/internal/email-account-query.service";
import {EmailAccount} from "../../domain/model/aggregates/EmailAccount";
import {EmailAccountCommandService} from "../../application/internal/email-account-command.service";
import {ActivateEmailAccountCommand} from "../../domain/model/commands/activate-email-account.command";

@Injectable()
export class EmailsContextFacadeService {

    constructor(
        @Inject()
        private readonly emailAccountQueryService: EmailAccountQueryService,
        @Inject()
        private readonly emailAccountCommandService:EmailAccountCommandService,
    ) {}

    public async obtainEmailAccountByDni(dni: string): Promise<EmailAccount | null> {
        return await this.emailAccountQueryService.getByDni(dni);
    }

    public async obtainEmailById(emailAccountId: number): Promise<EmailAccount | null> {
        return await this.emailAccountQueryService.getByEmailAccountId(emailAccountId);
    }

    public async activateEmailAccount(command:ActivateEmailAccountCommand): Promise<boolean> {
         return await this.emailAccountCommandService.HandleActivateEmailAccount(command);

    }

}
