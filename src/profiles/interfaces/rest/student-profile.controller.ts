import {StudentProfileCommandService} from "../../application/internal/Command-Services/student-profile-command.service";
import {Body, Controller, Post, Get, Param, Patch, UseFilters} from "@nestjs/common";
import {CreateStudentResourceDto} from "./dto/create-student-resource.dto";
import {CreateStudentWithAccountCommand} from "../../domain/model/commands/create-student-with-account.command";
import {StudentResourceDto} from "./dto/student-resource.dto";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {StudentProfileQueryService} from "../../application/internal/Query-Services/student-profile-query.service";
import {ProfileApplicationExceptionFilter} from "../filters/profile-application-exception.filter";


@ApiTags("StudentProfile")
@UseFilters(ProfileApplicationExceptionFilter)
@Controller('api/v1/profiles/students')
export class StudentProfileController{
    constructor(
        private readonly studentProfileCommandService: StudentProfileCommandService,
        private readonly studentProfileQueryService: StudentProfileQueryService,
    ) {
    }


    @ApiOperation({
        summary: 'Create Student Profile with Account',
        description: 'Creates a new student profile along with an associated account.'
    })
    @Post()
    async createStudentProfile(
        @Body() createStudentProfileDto: CreateStudentResourceDto )
        :Promise <StudentResourceDto> {
        const command = new CreateStudentWithAccountCommand(createStudentProfileDto);
        const studentProfileResource = await this.studentProfileCommandService.handleCreateStudentProfile(command);
        return StudentResourceDto.fromEntity(studentProfileResource);
    }

    @Patch(':id/activate')
    async activateStudent(@Param('id') id: string): Promise<StudentResourceDto> {
        const student = await this.studentProfileCommandService.handleActiveStudentProfile(+id);
        return StudentResourceDto.fromEntity(student);
    }


    @ApiOperation({
        summary: 'Get Student Profile by Account ID',
        description: 'Obtiene el perfil de un estudiante por su identificador de cuenta.'
    })
    @Get('by-account/:accountId')
    async getStudentByAccountId(@Param('accountId') accountId: string): Promise<StudentResourceDto> {
        const student = await this.studentProfileQueryService.getStudentByAccountId(+accountId);
        return StudentResourceDto.fromEntity(student);
    }


    @ApiOperation({
        summary: 'Get Student Profile by ID',
        description: 'Obtiene el perfil de un estudiante por su identificador.'
    })
    @Get(':id')
    async getStudentProfileById(@Param('id') id: string): Promise<StudentResourceDto> {
        const studentId = Number(id);
        const student = await this.studentProfileQueryService.getStudentById(studentId);
        return StudentResourceDto.fromEntity(student);
    }


    @ApiOperation({
        summary: 'Get all Student Profiles',
        description: 'Obtiene todos los perfiles de estudiantes.'
    })
    @Get()
    async getAllStudentProfiles(): Promise<StudentResourceDto[]> {
        const students = await this.studentProfileQueryService.getAllStudents();
        return students.map(StudentResourceDto.fromEntity);
    }

    @ApiOperation({
        summary: 'Get Student Profiles by Institute',
        description: 'Obtiene los perfiles de estudiantes asociados a un instituto específico.'
    })
    @Get('by-institute/:instituteId')
    async getStudentsByInstitute(
        @Param('instituteId') instituteId: number
    ): Promise<StudentResourceDto[]> {
        const students = await this.studentProfileQueryService.getStudentsByInstitute(instituteId);
        return students.map(StudentResourceDto.fromEntity);
    }

}