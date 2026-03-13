import {
    TeacherProfileCommandService
} from "../../application/internal/Command-Services/teacher-profile-command.service";
import {TeacherProfileQueryService} from "../../application/internal/Query-Services/teacher-profile-query.service";
import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CreateTeacherResourceDto} from "./dto/create-teacher-resource.dto";
import {TeacherResourceDto} from "./dto/teacher-resource.dto";
import {ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {CreateTeacherWithAccountCommand} from "../../domain/model/commands/create-teacher-with-account.command";
import {TeacherResourceWithInstituteResourceDto} from "./dto/teacher-resource-with-institute-resource.dto";

@ApiTags("teacher-profile")
@Controller('api/v1/teacher-profile')
export class TeacherProfileController {

    constructor(
        private readonly teacherProfileCommandService: TeacherProfileCommandService,
        private readonly teacherProfileQueryService: TeacherProfileQueryService) {
    }


    @Post()
    async createTeacherProfile(
        @Body() createTeacherResourceDto: CreateTeacherResourceDto)
        :Promise<TeacherResourceDto> {

        const command = new CreateTeacherWithAccountCommand(createTeacherResourceDto);
        const teacherProfile = await this.teacherProfileCommandService.handleCreateTeacherProfile(command);
        return TeacherResourceDto.fromEntity(teacherProfile);
    }


    @ApiOperation({
        summary: 'Get Teacher Profile by Account ID',
        description: 'Obtiene el perfil de un profesor por su identificador de cuenta.'
    })
    @ApiParam({ name: 'accountId', type: Number, description: 'The ID of the account associated with the teacher profile' })
    @Get('by-account/:accountId')
    async getTeacherProfileByAccountId(@Param("accountId") accountId: number): Promise<TeacherResourceDto> {
        const teacher = await this.teacherProfileQueryService.getTeacherProfileByAccountId(accountId);
        return TeacherResourceWithInstituteResourceDto.fromEntity(teacher.teacher, teacher.instituteId);
    }
}