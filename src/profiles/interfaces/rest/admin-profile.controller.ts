import {AdminProfileCommandService} from "../../application/internal/Command-Services/admin-profile-command.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, UseFilters} from "@nestjs/common";
import {
    CreateAdminWithAccountCommand
} from "../../domain/model/commands/create-admin-with-account.command";
import {CreateAdminResourceDto} from "./dto/create-admin-resource.dto";
import {AdminResourceDto} from "./dto/admin-resource.dto";
import {ProfileApplicationExceptionFilter} from "../filters/profile-application-exception.filter";


@ApiTags("Admin Profile")
@UseFilters(ProfileApplicationExceptionFilter)
@Controller('api/v1/profile/admins')
export class AdminProfileController {

    constructor(
        private readonly adminProfileCommandService: AdminProfileCommandService
    ) {
    }


    @ApiOperation({
        summary: 'Create Admin Profile with Account',
        description: 'Creates a new admin profile along with an associated account.'
    })
    @Post()
    async createAdminProfile(
        @Body() createAdminProfileDto: CreateAdminResourceDto )
        :Promise <AdminResourceDto> {
        const command = new CreateAdminWithAccountCommand(createAdminProfileDto);
        const adminProfileResource = await this.adminProfileCommandService.handleCreateAdminProfile(command);
        return AdminResourceDto.fromEntity(adminProfileResource);
    }
}
