import {IInstituteCommandService} from "../../domain/services/i-institute-command-service";
import {Inject, Injectable} from "@nestjs/common";
import { CreateInstituteCommand } from "../../domain/model/commands/create-institute.command";
import { Institute } from "../../domain/model/entities/institute";
import {INSTITUTESREPOSITORYTOKEN} from "../../domain/repositories/institutes--repository.token";
import {InstituteExcelService} from "../../infrastructure/excel/institute-excel.service";

import {InstituteRepository} from "../../infrastructure/persistence/typeorm/repositories/instituteRepository";


@Injectable()
export class InstituteCommandService implements IInstituteCommandService {


    constructor(
        @Inject(INSTITUTESREPOSITORYTOKEN)
        private readonly instituteRepository: InstituteRepository,
        private readonly instituteExcelService: InstituteExcelService
    ) {
    }

    async HandleCreateInstitute(command: CreateInstituteCommand): Promise<Institute> {

        const institute:Institute = await Institute.constructInstituteFromCommand(command);
        return await this.instituteRepository.addAsync(institute);


    }
    async HandleCreateInstitutesFromExcel(file: Buffer): Promise<Institute[]> {
        const commands = await this.instituteExcelService.parseExcel(file);
        const createdInstitutes: Institute[] = [];

        // Validar todos los comandos antes de guardar
        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            // Aquí puedes mapear y validar el NivMod
            try {
                await Institute.constructInstituteFromCommand(command);
            } catch (error) {
                throw new Error(`Error en la fila ${i + 4}: ${error.message}`);
            }
        }

        // Guardado con try-catch global
        try {
            for (const command of commands) {
                const institute: Institute = await Institute.constructInstituteFromCommand(command);
                createdInstitutes.push(await this.instituteRepository.addAsync(institute));
            }
            return createdInstitutes;
        } catch (error) {
            throw new Error(`Error al guardar institutos: ${error.message}`);
        }
    }
}