import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsEnum, IsInt, IsOptional, IsString} from "class-validator";
import {RequestStatus} from "../../../domain/model/value-objects/RequestStatus";


export class ReviewRequestDto {
    @ApiProperty({ type: Number, description: 'ID del admin' })
    @IsInt()
    adminId: number;

    @ApiProperty({ enum: RequestStatus, description: 'Respuesta (estado de la solicitud)' })
    @IsEnum(RequestStatus)
    response: RequestStatus;

    @ApiPropertyOptional({ type: String, description: 'Comentario opcional' })
    @IsOptional()
    @IsString()
    comment?: string;
}