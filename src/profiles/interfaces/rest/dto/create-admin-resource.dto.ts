import {IsString, IsNotEmpty, Length, MinLength, MaxLength, IsStrongPassword} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminResourceDto {
    @ApiProperty({
        example: 'adminuser',
        description: 'Nombre de usuario único para el administrador',
        minLength: 4,
        maxLength: 20,
    })
    @IsString()
    @IsNotEmpty()
    @Length(4, 20)
    username: string;

    @ApiProperty({
        example: 'StrongP@ssw0rd',
        description: 'Contraseña segura para la cuenta',
        minLength: 8,
        maxLength: 20
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @IsStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    password: string;
}