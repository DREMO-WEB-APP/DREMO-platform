import {
    TeacherProfileCommandService
} from "../../application/internal/Command-Services/teacher-profile-command.service";
import {Body, Controller, Get, Post, Query, UsePipes, ValidationPipe} from "@nestjs/common";
import {TeacherProfileQueryService} from "../../application/internal/Query-Services/teacher-profile-query.service";
import {ValidateInvitationTokenCommand} from "../../../iam/domain/model/commands/validate-invitation-token.command";
import {ApiOperation, ApiQuery, ApiResponse} from "@nestjs/swagger";
import {
    GenerateTeacherRegisterInvitationCommand
} from "../../domain/model/commands/generate-teacher-register-invitation.command";
import {GenerateTeacherInvitationUrlDto} from "./dto/generate-teacher-invitation-url.dto";
import {TeacherResourceDto} from "./dto/teacher-resource.dto";
import {CreateTeacherFromInvitationResourceDto} from "./dto/create-teacher-from-invitation-resource.dto";
import {
    CreateTeacherProfileFromInvitationCommand
} from "../../domain/model/commands/create-teacher-profile-from-invitation.command";


@Controller('api/v1/profiles')
export class TeacherInvitationController{

    constructor(
        private readonly teacherProfileCommandService: TeacherProfileCommandService,
        private readonly teacherProfileQueryService: TeacherProfileQueryService,
    ) {
    }


    @ApiQuery({ name: 'token', required: true, type: String })
    @ApiResponse({ status: 200, description: 'Returns a message indicating if the token is correct'})
    @ApiOperation({
        summary: 'Verify invitation token',
        description: 'This endpoint verifies the invitation token and returns a message indicating if the token is correct',
    })
    @Get('teacher-profiles/invitations/verify')
    async validateTokenInvitation( @Query('token') token: string) : Promise<string> {

        const validateTokenCommand
            = new ValidateInvitationTokenCommand(token);

        return await this.teacherProfileQueryService.handleGetInvitationTokenVerification(validateTokenCommand);

    }

    @UsePipes(new ValidationPipe())
    @ApiOperation({
        summary: 'Generate teacher invitation url',
        description: 'This endpoint generates an invitation url for teacher registration'
    })
    @ApiResponse({ status: 200, description: 'Returns the generated invitation url'})
    @Post('teacher-profiles/invitations')
    async createInvitationUrl( @Body() generateTeacherInvitationUrlDto: GenerateTeacherInvitationUrlDto) : Promise<string> {
        const generateAthleteInvitationUrlCommand
            = new GenerateTeacherRegisterInvitationCommand(generateTeacherInvitationUrlDto.instituteId);

        return await this.teacherProfileCommandService
            .handleGenerateTeacherRegisterInvitation(generateAthleteInvitationUrlCommand);
    }



    @UsePipes(new ValidationPipe())
    @ApiOperation({
        summary: 'Create teacher profile from invitation',
        description: 'This endpoint creates a teacher profile from an invitation'
    })
    @ApiResponse({ status: 200, description: 'Returns the created teacher profile'})
    @Post('teacher-profiles/invitations/accept')
    async createTeacherProfileFromInvitation(@Body() createTeacherProfileFromInvitationDto: CreateTeacherFromInvitationResourceDto) : Promise<TeacherResourceDto> {
        const command = new CreateTeacherProfileFromInvitationCommand(createTeacherProfileFromInvitationDto);
        const teacher = await this.teacherProfileCommandService
            .handleCreateTeacherProfileFromInvitation(command);
        if(teacher){
            return TeacherResourceDto.fromEntity(teacher);
        }
        else{
            throw new Error("Error creating teacher profile from invitation.");
        }

    }


}