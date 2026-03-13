import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, Length} from "class-validator";


export class CreateInstituteResourceDto {
    @ApiProperty({
        description: 'Código modular de la institución educativa.',
        example: '1234567'
    })
    @IsNotEmpty({ message: 'El código modular es obligatorio.' })
    @IsString({ message: 'El código modular debe ser una cadena de texto.' })
    @Length(6, 7, { message: 'El código modular debe tener entre 6 y 7 caracteres.' })
    codMod: string;

    @ApiProperty({
        description: 'Código local de la institución educativa.',
        example: 'A123'
    })
    @IsNotEmpty({ message: 'El código local es obligatorio.' })
    @IsString({ message: 'El código local debe ser una cadena de texto.' })
    @Length(1, 10, { message: 'El código local debe tener entre 1 y 10 caracteres.' })
    codLocal: string;

    @ApiProperty({
        description: 'Nombre de la institución educativa.',
        example: 'Institución Educativa Nacional San Martín'
    })
    @IsNotEmpty({ message: 'El nombre de la institución es obligatorio.' })
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres.' })
    name: string;

    @ApiProperty({
        description: 'Nivel o modalidad de la institución educativa.',
        example: 'Secundaria'
    })
    @IsNotEmpty({ message: 'El nivel/modalidad es obligatorio.' })
    @IsString({ message: 'El nivel/modalidad debe ser una cadena de texto.' })
    nivMod: string;

    @ApiProperty({
        description: 'Dirección de la institución educativa.',
        example: 'Av. Los Próceres 123, Lima'
    })
    @IsNotEmpty({ message: 'La dirección es obligatoria.' })
    @IsString({ message: 'La dirección debe ser una cadena de texto.' })
    @Length(5, 150, { message: 'La dirección debe tener entre 5 y 150 caracteres.' })
    address: string;

    @ApiProperty({
        description: 'UGEL a la que pertenece la institución educativa.',
        example: 'UGEL 01'
    })
    @IsNotEmpty({ message: 'La UGEL es obligatoria.' })
    @IsString({ message: 'La UGEL debe ser una cadena de texto.' })
    ugel: string;
}