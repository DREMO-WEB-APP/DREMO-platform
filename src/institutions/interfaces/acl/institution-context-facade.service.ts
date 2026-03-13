import {Inject, Injectable} from "@nestjs/common";
import {InstituteCommandService} from "../../application/internal/institute-command.service";
import {IInstituteQueryService} from "../../domain/services/i-institute-query-service";
import {InstituteQueryService} from "../../application/internal/institute-query.service";
import {Institute} from "../../domain/model/entities/institute";

@Injectable()
export class InstitutionContextFacadeService{

    constructor(
        @Inject()
        private readonly instituteCommandService: InstituteCommandService,
        @Inject()
        private readonly instituteQueryService: InstituteQueryService

    ) {
    }

    public async instituteExitsByName(name:string):Promise<boolean>{
        return !!await this.instituteQueryService.getInstituteByName(name);
    }

    public async getInstituteByName(name:string):Promise<Institute[]> {
        return await this.instituteQueryService.getInstituteByName(name);
    }

    public async getInstituteById(id:number):Promise<Institute> {
        return await this.instituteQueryService.getInstituteById(id);
    }


}