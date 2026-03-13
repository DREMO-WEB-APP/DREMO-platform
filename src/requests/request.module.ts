import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Request } from "./domain/model/aggregates/Request";
import { RequestCommandService } from "./application/internal/request-command.service";
import { RequestQueryService } from "./application/internal/request-query.service";
import { REQUEST_REPOSITORY_TOKEN } from "./domain/repositories/request-repository.token";
import { RequestRepository } from "./infrastructure/persistence/typeorm/repositories/RequestRepository";
import { RequestController } from "./interfaces/rest/Request.controller";
import {ProfilesModule} from "../profiles/profiles.module";
import {ExternalStudentProfileService} from "./application/internal/outbound-service/external-student-profile.service";
import {ExternalAdminProfileService} from "./application/internal/outbound-service/external-admin-profile.service";
import {CqrsModule} from "@nestjs/cqrs";
import {RequestReviewedHandler} from "../emails/application/internal/event-handler/request-reviewed.handler";
import {ExternalTeacherProfileService} from "./application/internal/outbound-service/external-teacher-profile.service";

@Module({
  imports: [
      TypeOrmModule.forFeature([Request]),
      ProfilesModule,
      CqrsModule
  ],
  providers: [
    RequestCommandService,
    RequestQueryService,
    {
        provide: REQUEST_REPOSITORY_TOKEN,
        useClass: RequestRepository
    },
    ExternalStudentProfileService,
    ExternalAdminProfileService,
    ExternalTeacherProfileService,
  ],
  controllers: [RequestController],
  exports: [REQUEST_REPOSITORY_TOKEN],
})
export class RequestsModule {}

