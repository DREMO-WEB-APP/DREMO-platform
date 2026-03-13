import {Student} from "./domain/model/aggregates/student";
import {Admin} from "./domain/model/aggregates/Admin";
import {TypeOrmModule} from "@nestjs/typeorm";
import {forwardRef, Module} from "@nestjs/common";
import {StudentProfileCommandService} from "./application/internal/Command-Services/student-profile-command.service";
import {STUDENT_PROFILE_REPOSITORY_TOKEN} from "./domain/repositories/student-profile-repository.token";
import {StudentProfileRepository} from "./infrastructure/persistence/typeorm/repositories/StudentProfileRepository";
import {StudentProfileController} from "./interfaces/rest/student-profile.controller";
import {IamModule} from "../iam/iam.module";
import {ExternalIamService} from "./application/internal/outbound-services/external-iam.service";
import {DniValidatorService} from "./infrastructure/dni/services/dni-validator.service";
import { HttpModule } from "@nestjs/axios";
import {EmailsModule} from "../emails/emails.module";
import {StudentProfileQueryService} from "./application/internal/Query-Services/student-profile-query.service";
import {CqrsModule} from "@nestjs/cqrs";
import {StudentContextFacadeService} from "./interfaces/acl/student-context-facade.service";
import {AdminProfileCommandService} from "./application/internal/Command-Services/admin-profile-command.service";
import {ADMIN_PROFILE_REPOSITORY_TOKEN} from "./domain/repositories/admin-profile-repository.token";
import {AdminProfileRepository} from "./infrastructure/persistence/typeorm/repositories/AdminProfileRepository";
import {AdminProfileController} from "./interfaces/rest/admin-profile.controller";
import {AdminContextFacadeService} from "./interfaces/acl/admin-context-facade.service";
import {AdminProfileQueryService} from "./application/internal/Query-Services/admin-profile-query.service";
import {EmailAccountCreatedHandler} from "./application/internal/event-handlers/email-account-created.handler";
import {ExternalEmailAccountService} from "./application/internal/outbound-services/external-email-account.service";
import {InstitutesModule} from "../institutions/institutes.module";
import {ExternalInstituteService} from "./application/internal/outbound-services/external-institute.service";
import {TeacherProfileCommandService} from "./application/internal/Command-Services/teacher-profile-command.service";
import {TeacherProfileQueryService} from "./application/internal/Query-Services/teacher-profile-query.service";
import {TEACHER_PROFILE_REPOSITORY_TOKEN} from "./domain/repositories/teacher-profile-repository.token";
import {TeacherProfileRepository} from "./infrastructure/persistence/typeorm/repositories/TeacherProfileRepository";
import {TeacherProfileController} from "./interfaces/rest/teacher-profile.controller";
import {Teacher} from "./domain/model/aggregates/teacher";
import {TeacherContextFacadeService} from "./interfaces/acl/teacher-context-facade.service";
import {InvitationCommandService} from "./application/internal/Command-Services/invitation-command.service";
import {InvitationQueryService} from "./application/internal/Query-Services/invitation-query.service";
import {InvitationGeneratedHandler} from "./application/internal/event-handlers/invitation-generated-handler";
import {InvitationUsedHandler} from "./application/internal/event-handlers/invitation-used-handler";
import {InvitationRepository} from "./infrastructure/persistence/typeorm/repositories/InvitationRepository";
import {INVITATION_REPOSITORY_TOKEN} from "./domain/repositories/invitation-repository.token";
import {TeacherInvitationController} from "./interfaces/rest/teacher-invitation.controller";
import {Invitation} from "./domain/model/aggregates/invitation";

@Module({
    imports: [
        TypeOrmModule.forFeature([Student, Admin, Teacher, Invitation ]),
        IamModule,
        CqrsModule,
        InstitutesModule,
        forwardRef(() => EmailsModule),
        HttpModule,
    ],
    providers: [
        StudentProfileCommandService,
        StudentProfileQueryService,
        AdminProfileCommandService,
        AdminProfileQueryService,
        TeacherProfileCommandService,
        TeacherProfileQueryService,
        InvitationCommandService,
        InvitationQueryService,
        InvitationGeneratedHandler,
        InvitationUsedHandler,
        EmailAccountCreatedHandler,
        {
            provide: STUDENT_PROFILE_REPOSITORY_TOKEN,
            useClass: StudentProfileRepository
        },
        {
            provide: ADMIN_PROFILE_REPOSITORY_TOKEN,
            useClass: AdminProfileRepository
        },
        {
            provide: TEACHER_PROFILE_REPOSITORY_TOKEN,
            useClass: TeacherProfileRepository
        },
        {
            provide: INVITATION_REPOSITORY_TOKEN,
            useClass: InvitationRepository
        },
        ExternalIamService,
        ExternalEmailAccountService,
        ExternalInstituteService,
        DniValidatorService,
        StudentContextFacadeService,
        AdminContextFacadeService,
        TeacherContextFacadeService,
    ],
    exports: [STUDENT_PROFILE_REPOSITORY_TOKEN, ADMIN_PROFILE_REPOSITORY_TOKEN, TEACHER_PROFILE_REPOSITORY_TOKEN, INVITATION_REPOSITORY_TOKEN, StudentContextFacadeService, AdminContextFacadeService, TeacherContextFacadeService],
    controllers: [StudentProfileController, AdminProfileController, TeacherProfileController, TeacherInvitationController]
})
export class ProfilesModule {}