import {IEmailAccountCommandService} from "../../domain/services/i-email-account-command-service";
import {Inject, Injectable} from "@nestjs/common";
import {EMAIL_ACCOUNT_REPOSITORY_TOKEN} from "../../domain/repositories/email-account-repository.token";
import {IEmailAccountRepository} from "../../domain/repositories/i-email-account-repository";
import {EmailAccount} from "../../domain/model/aggregates/EmailAccount";
import { CreateEmailAccountCommand } from "src/emails/domain/model/commands/create-email-account.command";
import { UploadedExcelFile } from "../../domain/services/i-email-account-command-service";
import * as XLSX from 'xlsx';
import {GoogleEmailProvisioner} from "../../infrastructure/email-service/gmail/google-email-provisioner";
import { ActivateEmailAccountCommand } from "src/emails/domain/model/commands/activate-email-account.command";


@Injectable()
export class EmailAccountCommandService implements IEmailAccountCommandService {

    constructor(
        @Inject(EMAIL_ACCOUNT_REPOSITORY_TOKEN)
        private readonly emailAccountRepository: IEmailAccountRepository<EmailAccount>,
        private readonly emailProvisioner: GoogleEmailProvisioner,
    ) {
    }

    async HandleActivateEmailAccount(command: ActivateEmailAccountCommand): Promise<boolean> {
        try{
            await this.emailProvisioner.provision({
                email: command.emailAddress,
                tempPassword: command.encryptedPassword,
                firstName: command.firstName,
                lastName: command.lastName,
            })
            return true;
        }
        catch (error){
            throw new Error(`Error al provisionar el correo: ${error.message}`);
        }
    }

    async HandleCreateEmailAccount(command: CreateEmailAccountCommand): Promise<EmailAccount> {

        if(await this.emailAccountRepository.findByEmailAddressAsync(command.emailAddress)){
            throw new Error(`Ya existe una cuenta de correo con la dirección ${command.emailAddress}`);
        }
        const emailAccount = EmailAccount.constructEmailAccountFromCommand(command);

        return this.emailAccountRepository.addAsync(emailAccount);
    }

    async HandleCreateEmailAccountsFromExcel(file: UploadedExcelFile): Promise<EmailAccount[]> {
        try {
            const workbook = XLSX.read(file.buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });
            const createdEmailAccounts: EmailAccount[] = [];

            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const rowNumber = i + 2; // +2 porque Excel empieza en 1 y la primera fila es encabezado

                const emailAddress = String(row['Email Address [Required]'] || '').trim();
                const encryptedPassword = String(row['Password [Required]'] || '').trim();

                if (!emailAddress || !encryptedPassword) {
                    throw new Error(`Falta campo requerido en la fila ${rowNumber}`);
                }

                // Validar formato de email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailAddress)) {
                    throw new Error(`El email "${emailAddress}" en la fila ${rowNumber} no es válido`);
                }

                // Verificar si el email ya existe
                const exists = await this.emailAccountRepository.findByEmailAddressAsync(emailAddress);
                if (exists) {
                    throw new Error(`El email "${emailAddress}" en la fila ${rowNumber} ya existe`);
                }

                const command = new CreateEmailAccountCommand(emailAddress, encryptedPassword);
                const emailAccount = EmailAccount.constructEmailAccountFromCommand(command);

                createdEmailAccounts.push(emailAccount);
            }

            // Si todo está bien, registrar todos los correos
            const savedAccounts: EmailAccount[] = [];
            for (const account of createdEmailAccounts) {
                const saved = await this.emailAccountRepository.addAsync(account);
                savedAccounts.push(saved);
            }

            return savedAccounts;
        } catch (error) {
            throw new Error(`Error al procesar el archivo: ${error.message}`);
        }
    }

}