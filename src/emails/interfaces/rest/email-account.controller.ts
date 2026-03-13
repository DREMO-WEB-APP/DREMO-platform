import {Body, Controller, Post, UploadedFile, UseInterceptors, Get, Param, Query} from "@nestjs/common";
import {ApiBody, ApiConsumes, ApiOperation, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {EmailAccountCommandService} from "../../application/internal/email-account-command.service";
import {CreateEmailAccountCommand} from "../../domain/model/commands/create-email-account.command";
import {UploadedExcelFile} from "../../domain/services/i-email-account-command-service";

import {CreateEmailAccountDto} from "./dto/create-email-account.dto";
import {EmailAccountResourceDto} from "./dto/email-account-resource.dto";
import {EmailAccountQueryService} from "../../application/internal/email-account-query.service";

@ApiTags('EmailAccounts')
@Controller('api/v1/emails')
export class EmailAccountController {
    constructor(
        private readonly emailAccountCommandService: EmailAccountCommandService,
        private readonly emailAccountQueryService: EmailAccountQueryService,
    ) {}

    @ApiOperation({
        summary: 'Crear una cuenta de correo',
        description: 'Crea una nueva cuenta de correo electrónica.'
    })
    @Post()
    async createEmailAccount(@Body() body: CreateEmailAccountDto): Promise<EmailAccountResourceDto> {
        const command = new CreateEmailAccountCommand(body.emailAddress, body.encryptedPassword);
        const emailAccount = await this.emailAccountCommandService.HandleCreateEmailAccount(command);
        return EmailAccountResourceDto.fromEntity(emailAccount);
    }

    @ApiOperation({
        summary: 'Crear múltiples cuentas de correo desde un Excel',
        description: 'Procesa un archivo Excel con columnas: First Name [Required], Last Name [Required], Email Address [Required], Password [Required].'
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Archivo Excel para la creación masiva de cuentas de correo',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @Post('bulk-from-excel')
    @UseInterceptors(FileInterceptor('file'))
    async createEmailAccountsFromExcel(
        @UploadedFile() file: any,
    ): Promise<EmailAccountResourceDto[]> {
        const uploaded: UploadedExcelFile = { buffer: file.buffer };
        const created = await this.emailAccountCommandService.HandleCreateEmailAccountsFromExcel(uploaded);
        return created.map(EmailAccountResourceDto.fromEntity);
    }

    @ApiOperation({
        summary: 'Obtener cuenta de correo por ID',
        description: 'Devuelve la cuenta de correo asociada al identificador proporcionado.'
    })
    @Get(':id')
    async getEmailAccountById(@Param('id') id: string): Promise<EmailAccountResourceDto> {
        const emailAccountId = Number(id);
        const emailAccount = await this.emailAccountQueryService.getByEmailAccountId(emailAccountId);
        return EmailAccountResourceDto.fromEntity(emailAccount);
    }

    @ApiOperation({
        summary: 'Obtener cuenta de correo por dirección de email',
        description: 'Devuelve la cuenta de correo asociada a la dirección de email proporcionada.'
    })
    @Get()
    async getEmailAccountByEmail(@Query('email') email: string): Promise<EmailAccountResourceDto> {
        const emailAccount = await this.emailAccountQueryService.getByEmailAddress(email);
        return EmailAccountResourceDto.fromEntity(emailAccount);
    }

    @ApiOperation({
        summary: 'Obtener cuenta de correo por DNI',
        description: 'Devuelve la cuenta de correo cuyo email comienza con el DNI proporcionado.'
    })
    @Get('by-dni/:dni')
    async getEmailAccountByDni(@Param('dni') dni: string): Promise<EmailAccountResourceDto> {
        const emailAccount = await this.emailAccountQueryService.getByDni(dni);
        return EmailAccountResourceDto.fromEntity(emailAccount);
    }
}
