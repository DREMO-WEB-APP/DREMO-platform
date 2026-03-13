import {forwardRef, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailAccount } from './domain/model/aggregates/EmailAccount';
import { EMAIL_ACCOUNT_REPOSITORY_TOKEN } from './domain/repositories/email-account-repository.token';
import { EmailAccountRepository } from './infrastructure/persistence/typeorm/repositories/EmailAccountRepository';
import { EmailAccountCommandService } from './application/internal/email-account-command.service';
import { EmailAccountQueryService } from './application/internal/email-account-query.service';
import { EmailsContextFacadeService } from './interfaces/acl/emails-context-facade.service';
import { EmailAccountController } from './interfaces/rest/email-account.controller';
import {RequestReviewedHandler} from "./application/internal/event-handler/request-reviewed.handler";
import {CqrsModule} from "@nestjs/cqrs";
import {ExternalStudentProfileService} from "./application/internal/outbound-services/external-student-profile.service";
import {ProfilesModule} from "../profiles/profiles.module";
import {GoogleEmailProvisioner} from "./infrastructure/email-service/gmail/google-email-provisioner";
import {UgelDomainDiccionary} from "./application/utils/ugel-domain.diccionary";
import {StudentProfileCreatedHandler} from "./application/internal/event-handler/student-profile-created.handler";

@Module({
  imports: [
      TypeOrmModule.forFeature([EmailAccount]),
      CqrsModule,
      forwardRef(() => ProfilesModule),
  ],
  providers: [

    EmailAccountCommandService,
    EmailAccountQueryService,
    EmailsContextFacadeService,
    RequestReviewedHandler,
    ExternalStudentProfileService,
    UgelDomainDiccionary,
    GoogleEmailProvisioner,
    StudentProfileCreatedHandler,
    {
      provide: EMAIL_ACCOUNT_REPOSITORY_TOKEN,
      useClass: EmailAccountRepository,
    },
  ],
  controllers: [EmailAccountController],
  exports: [EMAIL_ACCOUNT_REPOSITORY_TOKEN,EmailsContextFacadeService],
})
export class EmailsModule {}

