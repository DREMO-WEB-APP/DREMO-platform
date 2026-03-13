import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Institute } from './domain/model/entities/institute';

import { InstituteRepository } from './infrastructure/persistence/typeorm/repositories/instituteRepository';
import { InstituteExcelService } from './infrastructure/excel/institute-excel.service';
import { InstituteController } from './interfaces/rest/institute.controller';
import { InstituteCommandService } from './application/internal/institute-command.service';
import {INSTITUTESREPOSITORYTOKEN} from "./domain/repositories/institutes--repository.token";
import {InstitutionContextFacadeService} from "./interfaces/acl/institution-context-facade.service";
import {InstituteQueryService} from "./application/internal/institute-query.service";



@Module({
    imports: [
        TypeOrmModule.forFeature([Institute]),
        CqrsModule,
        // Importa otros módulos si es necesario con forwardRef
    ],
    providers: [
        InstituteExcelService,
        InstituteCommandService,
        InstituteQueryService,
        {
            provide: INSTITUTESREPOSITORYTOKEN,
            useClass: InstituteRepository,
        },
        InstitutionContextFacadeService,
    ],
    controllers: [InstituteController],
    exports: [
        INSTITUTESREPOSITORYTOKEN,
        InstituteExcelService,
        InstitutionContextFacadeService
        // Exporta otros servicios si es necesario
    ],
})
export class InstitutesModule {}