import {Inject, Injectable} from "@nestjs/common";
import {
    InstitutionContextFacadeService
} from "../../../../institutions/interfaces/acl/institution-context-facade.service";
import {Institute} from "../../../../institutions/domain/model/entities/institute";


@Injectable()
export class ExternalInstituteService{

    constructor(
        @Inject()
        public readonly institutionFacadeService: InstitutionContextFacadeService
    ) {

    }


    async instituteExistsByName(name: string): Promise<boolean> {
        return await this.institutionFacadeService.instituteExitsByName(name);
    }


    async getInstituteById(id: number): Promise<Institute> {
        return await this.institutionFacadeService.getInstituteById(id);
    }





}