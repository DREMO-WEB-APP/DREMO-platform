import {Inject, Injectable} from "@nestjs/common";
import {AdminContextFacadeService} from "../../../../profiles/interfaces/acl/admin-context-facade.service";

@Injectable()
export class ExternalAdminProfileService{
    constructor(
        @Inject()
        private readonly adminProfileContextFacade: AdminContextFacadeService
    ) {
    }

    public async adminProfileExistsById(adminId: number): Promise<boolean> {
        return await this.adminProfileContextFacade.AdminProfileExists(adminId);
    }

    public async getAdminProfileById(adminId: number) {
        return await this.adminProfileContextFacade.GetAdminProfileById(adminId);
    }

}