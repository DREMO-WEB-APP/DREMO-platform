import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class GetInstituteByQueryDto{

    @ApiProperty({
        description: 'Nombre de la institución educativa.',
        example: 'Institución Educativa Nacional San Martín',
        required: false
    })
    @IsString()
     name?: string;

    @ApiProperty({
        description: 'Nivel o modalidad de la institución educativa.',
        example: 'Secundaria',
        required: false
    })
    @IsString()
     nivMod?: string;
}