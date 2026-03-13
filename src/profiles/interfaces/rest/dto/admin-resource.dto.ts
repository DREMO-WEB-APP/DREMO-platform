import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '../../../domain/model/value-objects/UserStatus';
import { Admin } from '../../../domain/model/aggregates/Admin';

export class AdminResourceDto {
    @ApiProperty({ example: 1, description: 'ID único del admin' })
    id: number;

    @ApiProperty({ example: '2024-06-01T12:00:00Z', description: 'Fecha de creación' })
    createdAt: Date;

    @ApiProperty({ example: '2024-06-01T12:00:00Z', description: 'Fecha de última actualización' })
    updatedAt: Date;

    @ApiProperty({ enum: UserStatus, example: UserStatus.ACTIVE, description: 'Estado del usuario' })
    userStatus: UserStatus;

    @ApiProperty({ example: 10, description: 'ID de la cuenta asociada' })
    accountId: number;

    static fromEntity(admin: Admin): AdminResourceDto {
        const dto = new AdminResourceDto();
        dto.id = admin.id;
        dto.createdAt = admin.createdAt;
        dto.updatedAt = admin.updatedAt;
        dto.userStatus = admin.userStatus;
        dto.accountId = admin.accountId;
        return dto;
    }
}