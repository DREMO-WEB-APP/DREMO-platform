import { ApiProperty } from '@nestjs/swagger';
import { NivMod } from '../../../domain/model/value-objects/niv-mod';
import {Institute} from "../../../domain/model/entities/institute";

export class InstituteResourceDto {
    @ApiProperty({
        description: 'Identificador único del instituto.',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'Código modular de la institución educativa.',
        example: '1234567',
    })
    codMod: string;

    @ApiProperty({
        description: 'Código local de la institución educativa.',
        example: 'A123',
    })
    codLocal: string;

    @ApiProperty({
        description: 'Nombre de la institución educativa.',
        example: 'Institución Educativa Nacional San Martín',
    })
    name: string;

    @ApiProperty({
        description: 'Nivel o modalidad de la institución educativa.',
        example: NivMod.Secundaria,
        enum: NivMod,
    })
    nivMod: NivMod;

    @ApiProperty({
        description: 'Dirección de la institución educativa.',
        example: 'Av. Los Próceres 123, Lima',
    })
    address: string;


    static fromEntity(entity: Institute): InstituteResourceDto {
        const dto = new InstituteResourceDto();
        dto.id = entity.id;
        dto.codMod = entity.codMod;
        dto.codLocal = entity.codLocal;
        dto.name = entity.name;
        dto.nivMod = entity.nivMod;
        dto.address = entity.address;
        return dto;

    }


}