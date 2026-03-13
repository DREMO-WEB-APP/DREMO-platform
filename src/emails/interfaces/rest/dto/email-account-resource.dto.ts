import { ApiProperty } from '@nestjs/swagger';
import { EmailAccount } from '../../../domain/model/aggregates/EmailAccount';

export class EmailAccountResourceDto {
  @ApiProperty({ description: 'Identificador único de la cuenta de correo', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Dirección de correo electrónico única',
    example: '76254485@dominio.com.pe',
  })
  emailAddress: string;


    @ApiProperty({
        description: 'Contraseña encriptada de la cuenta de correo',
        example: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6LZ5q5eFh7v4u5hOe',
    })
   encryptedPassword: string;

  @ApiProperty({
    description: 'Fecha de creación de la cuenta de correo',
    example: '2026-01-21T09:30:00.000Z',
  })
  createdAt: Date;

  static fromEntity(entity: EmailAccount): EmailAccountResourceDto {
    const dto = new EmailAccountResourceDto();
    dto.id = entity.id;
    dto.emailAddress = entity.emailAddress;
    dto.encryptedPassword = entity.encryptedPassword;
    dto.createdAt = entity.createdAt;
    return dto;
  }
}

