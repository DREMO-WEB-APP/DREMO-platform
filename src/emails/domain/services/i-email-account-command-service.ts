import {CreateEmailAccountCommand} from "../model/commands/create-email-account.command";
import {EmailAccount} from "../model/aggregates/EmailAccount";
import {ActivateEmailAccountCommand} from "../model/commands/activate-email-account.command";


export interface UploadedExcelFile {
    buffer: Buffer;
}

export interface IEmailAccountCommandService {
    HandleCreateEmailAccount(command: CreateEmailAccountCommand): Promise<EmailAccount>;
    HandleCreateEmailAccountsFromExcel(file: UploadedExcelFile): Promise<EmailAccount[]>;


    HandleActivateEmailAccount(command: ActivateEmailAccountCommand): Promise<boolean>;
}