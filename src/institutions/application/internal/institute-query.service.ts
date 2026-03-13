import {Inject} from "@nestjs/common";
import {INSTITUTESREPOSITORYTOKEN} from "../../domain/repositories/institutes--repository.token";
import {Institute} from "../../domain/model/entities/institute";
import {InstituteRepository} from "../../infrastructure/persistence/typeorm/repositories/instituteRepository";
import {NivMod} from "../../domain/model/value-objects/niv-mod";


export class InstituteQueryService {


    constructor(
        @Inject(INSTITUTESREPOSITORYTOKEN)
        private readonly instituteRepository: InstituteRepository,
    ) {
    }


    async getInstituteById(instituteId: number): Promise<Institute> {
        return await this.instituteRepository.findByIdAsync(instituteId);
    }

    async getInstituteByName(instituteName: string): Promise<Institute[]> {
        return await this.instituteRepository.findByNameAsync(instituteName);
    }

    async getInstituteByQuery(name?: string, nivMod?: NivMod): Promise<Institute[]> {
        return await this.instituteRepository.findByQueryAsync(name, nivMod);
    }

}