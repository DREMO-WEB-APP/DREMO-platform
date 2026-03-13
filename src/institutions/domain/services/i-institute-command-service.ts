import {CreateInstituteCommand} from "../model/commands/create-institute.command";
import {Institute} from "../model/entities/institute";


export interface IInstituteCommandService{

    HandleCreateInstitute(command: CreateInstituteCommand): Promise<Institute>;
    HandleCreateInstitutesFromExcel(file: Buffer): Promise<Institute[]>;


}