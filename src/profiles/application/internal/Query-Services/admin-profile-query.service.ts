import {Inject, Injectable} from "@nestjs/common";
import {IAdminProfileQueryService} from "../../../domain/services/i-admin-profile-query-service";
import { Admin } from "src/profiles/domain/model/aggregates/Admin";
import {ADMIN_PROFILE_REPOSITORY_TOKEN} from "../../../domain/repositories/admin-profile-repository.token";
import {IAdminProfileRepository} from "../../../domain/repositories/i-admin-profile-repository";
import {AdminProfileNotFoundError} from "../../errors/admin-profile-not-found.error";

@Injectable()
export class AdminProfileQueryService implements IAdminProfileQueryService {

    constructor(
        @Inject(ADMIN_PROFILE_REPOSITORY_TOKEN)
        private readonly adminProfileRepository: IAdminProfileRepository<Admin>,
    ) {
    }

    async getAdminProfileById(adminId: number): Promise<Admin> {
       const adminFound:Admin= await this.adminProfileRepository.findByIdAsync(adminId);

       if(!adminFound){
           throw new AdminProfileNotFoundError(adminId);
       }
       return adminFound;
    }


}