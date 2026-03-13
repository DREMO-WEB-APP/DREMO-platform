import { Admin } from "src/profiles/domain/model/aggregates/Admin";
import {IAdminProfileCommandService} from "../../../domain/services/i-admin-profile-command-service";
import {Inject, Injectable} from "@nestjs/common";
import {ADMIN_PROFILE_REPOSITORY_TOKEN} from "../../../domain/repositories/admin-profile-repository.token";
import {IAdminProfileRepository} from "../../../domain/repositories/i-admin-profile-repository";
import {ExternalIamService} from "../outbound-services/external-iam.service";
import {CreateAdminWithAccountCommand} from "../../../domain/model/commands/create-admin-with-account.command";

@Injectable()
export class AdminProfileCommandService implements IAdminProfileCommandService {

    constructor(
        @Inject(ADMIN_PROFILE_REPOSITORY_TOKEN)
        private readonly adminProfileRepository: IAdminProfileRepository<Admin>,
        private readonly externalIamService: ExternalIamService,
    ) {
    }

    async handleCreateAdminProfile(command: CreateAdminWithAccountCommand): Promise<Admin> {

        const accountId: number = await this.externalIamService.createAccount(
            command.username,
            command.password,
            'admin',
        );

        const adminProfile: Admin = Admin.constructAdminProfileFromCommand(accountId);

        return await this.adminProfileRepository.addAsync(adminProfile);
    }
}