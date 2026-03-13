import {InstituteCommandService} from "../../application/internal/institute-command.service";
import {Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors} from "@nestjs/common";
import {CreateInstituteResourceDto} from "./dto/create-institute-resource.dto";
import {Institute} from "../../domain/model/entities/institute";
import {InstituteResourceDto} from "./dto/institute-resource.dto";
import {CreateInstituteCommand} from "../../domain/model/commands/create-institute.command";
import {ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {GetInstituteByQueryDto} from "./dto/get-institute-by-query.dto";
import {InstituteQueryService} from "../../application/internal/institute-query.service";
import {NivMod} from "../../domain/model/value-objects/niv-mod";


@ApiTags("Institute")
@Controller("api/v1/institutes")

export class InstituteController{

    constructor(
        private readonly instituteCommandService: InstituteCommandService,
        private readonly instituteQueryService:InstituteQueryService
    ) {
    }

    @ApiOperation({
        summary: 'Crear un instituto',
        description: 'Crea un nuevo instituto con la información proporcionada.'
    })
    @Post()
    async createInstitute(
        @Body()
        body: CreateInstituteResourceDto
    ):Promise<InstituteResourceDto> {
        const command:CreateInstituteCommand= body;
        const institute:Institute = await this.instituteCommandService.HandleCreateInstitute(command);
        return InstituteResourceDto.fromEntity(institute);
    }

    @ApiOperation({
        summary: 'Crear múltiples institutos desde un Excel',
        description: 'Procesa un archivo Excel con columnas: Name [Required], Address [Required], Phone Number [Required].'
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
    @Post('from-excel')
    @UseInterceptors(FileInterceptor('file'))
    async createInstitutesFromExcel(
        @UploadedFile() file: any
    ):Promise<InstituteResourceDto[]> {

        const createdInstitutes:Institute[] = await this.instituteCommandService.HandleCreateInstitutesFromExcel(file.buffer);
        return createdInstitutes.map(institute => InstituteResourceDto.fromEntity(institute));
    }


    @Get('by-query')
    @ApiOperation({
        summary: 'Obtener institutos por consulta',
        description: 'Obtiene una lista de institutos que coinciden con los criterios de búsqueda proporcionados.'
    })
    @ApiQuery({ name: 'name', required: false, type: String })
    @ApiQuery({ name: 'nivMod', required: false, type: String })
    async getInstitutesByQuery(
        @Query('name') name?: string,
        @Query('nivMod') nivMod?: string
    ): Promise<Institute[]> {
        return this.instituteQueryService.getInstituteByQuery(name, NivMod[nivMod]);
    }



}