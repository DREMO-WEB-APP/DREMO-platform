import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateEmailAccountDto {
  @ApiProperty({
    description: 'Dirección de correo electrónico única',
    example: '76254485@dominio.com.pe',
  })
  @IsEmail()
  @IsNotEmpty()
  emailAddress: string;

  @ApiProperty({
    description: 'Contraseña (ya encriptada o valor a encriptar según la lógica del dominio)',
    example: '$2b$10$2lZJ0tL9H..hash-ejemplo..',
    minLength: 6,
  })
  @IsNotEmpty()
  @MinLength(6)
  encryptedPassword: string;
}

