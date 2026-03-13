import {Inject, Injectable} from "@nestjs/common";
import {AdminProfileQueryService} from "../../application/internal/Query-Services/admin-profile-query.service";
import {Admin} from "../../domain/model/aggregates/Admin";

@Injectable()
export class AdminContextFacadeService{

    constructor(
        @Inject()
        private readonly adminProfileQueryService: AdminProfileQueryService
    ) {
    }

    public async AdminProfileExists(adminId: number): Promise<boolean> {
        const adminFound:Admin =await this.adminProfileQueryService.getAdminProfileById(adminId);
        return !!adminFound;

    }

    public async GetAdminProfileById(adminId: number): Promise<Admin> {
        return await this.adminProfileQueryService.getAdminProfileById(adminId);
    }

}