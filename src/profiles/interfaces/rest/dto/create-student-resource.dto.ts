import {IsString, IsNotEmpty, MinLength, MaxLength, Matches, IsStrongPassword, IsNumber} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

// DTO para crear Student junto con su Account
export class CreateStudentResourceDto {
  // Cuenta
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ description: 'The account’s username', minLength: 3, maxLength: 50 })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  @IsStrongPassword(
      { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
      { message: 'La contraseña debe tener al menos 6 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.' }
  )
  @ApiProperty({ description: 'The account’s password (strong password)', minLength: 6, maxLength: 100 })
  password: string;

  // Estudiante
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ description: 'Student names', maxLength: 100 })
  names: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ description: 'Student last names', maxLength: 100 })
  lastNames: string;

  // DNI (8 dígitos en Perú)
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{8}$/)
  @ApiProperty({ description: 'Peruvian DNI (8 digits)', pattern: '^\\d{8}$' })
  dni: string;


    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'ID of the institute the student belongs to' })
  instituteId:number;
}
