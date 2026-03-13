import {Body, Controller, Delete, Get, Param, Post, Query, UsePipes, ValidationPipe} from "@nestjs/common";
import {ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import { RequestCommandService } from "../../application/internal/request-command.service";
import { RequestQueryService } from "../../application/internal/request-query.service";
import { RequestResourceDto } from "./dto/request-resource.dto";
import { ReviewRequestCommand } from "../../domain/model/commands/review-request.command";
import {ReviewRequestDto} from "./dto/review-request.dto";

@ApiTags('Requests')
@Controller('api/v1/requests')
export class RequestController {
  constructor(
    private readonly requestCommandService: RequestCommandService,
    private readonly requestQueryService: RequestQueryService,
  ) {}


  @ApiOperation({ summary: 'Crear una solicitud' })
  @UsePipes(new ValidationPipe())
  @Post(':studentId')
  @ApiParam({ name: 'studentId', required: true, description: 'ID del estudiante que realiza la solicitud' })
  async create(@Param('studentId') studentId: number): Promise<RequestResourceDto | null> {
      const request = await this.requestCommandService.createRequest(studentId);
      console.log(request);
      return RequestResourceDto.fromAggregate(request);
  }


    @Post(':id/review')
    async review(
        @Body() reviewRequestDto: ReviewRequestDto,
        @Param('id') id: string,
    ): Promise<RequestResourceDto> {
        const command = new ReviewRequestCommand(
            Number(id),
            reviewRequestDto.adminId,
            reviewRequestDto.response,
            reviewRequestDto.comment
        );
        const updated = await this.requestCommandService.reviewRequest(command);
        return RequestResourceDto.fromAggregate(updated);
    }

  @ApiOperation({ summary: 'Eliminar una solicitud' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.requestCommandService.deleteRequest(Number(id));
  }

  @ApiOperation({ summary: 'Obtener solicitud por ID' })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<RequestResourceDto> {
    const request = await this.requestQueryService.getById(Number(id));
    if (!request) {
      // Lanzar 404 si no se encuentra
      throw new (await import('@nestjs/common')).NotFoundException('Request not found');
    }
    return  RequestResourceDto.fromAggregate(request);
  }

  @ApiOperation({ summary: 'Obtener solicitudes por studentId' })
  @UsePipes(new ValidationPipe())
  @Get()
  async getByStudentId(@Query('studentId') studentId?: string): Promise<RequestResourceDto> {
      const request = await this.requestQueryService.getByStudentId(Number(studentId));
      if (!request) {
          return null
      }
      return RequestResourceDto.fromAggregate(request);
  }


  @ApiOperation({ summary: 'Obtener solicitudes pendientes' })
  @Get('pending/all')
  async getAllPendingRequests(): Promise<RequestResourceDto[]> {
      const list = await this.requestQueryService.getAllPendingRequests();
      const result:RequestResourceDto[]=[];
      for(const request of list){
            result.push(RequestResourceDto.fromAggregate(request));
      }
        return result;
  }


}
