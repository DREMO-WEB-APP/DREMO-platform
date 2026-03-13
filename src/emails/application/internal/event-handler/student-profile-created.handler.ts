
import {StudentProfileCreatedEvent} from "../../../../profiles/domain/model/events/student-profile-created.event";
import {EmailAccountCommandService} from "../email-account-command.service";
import {ExternalStudentProfileService} from "../outbound-services/external-student-profile.service";
import {EmailAccountQueryService} from "../email-account-query.service";
import {GoogleEmailProvisioner} from "../../../infrastructure/email-service/gmail/google-email-provisioner";
import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {UgelDomainDiccionary} from "../../utils/ugel-domain.diccionary";
import {Ugel} from "../../../../institutions/domain/model/value-objects/Ugel";
import {CreateEmailAccountCommand} from "../../../domain/model/commands/create-email-account.command";

@EventsHandler(StudentProfileCreatedEvent)
export class StudentProfileCreatedHandler
    implements IEventHandler<StudentProfileCreatedEvent> {

    constructor(
        private readonly emailAccountCommandService: EmailAccountCommandService,
        private readonly emailAccountQueryService: EmailAccountQueryService,
        private readonly externalStudentProfileService: ExternalStudentProfileService,
        private readonly emailProvisioner: GoogleEmailProvisioner,
    ) {
    }

    async handle(event: StudentProfileCreatedEvent): Promise<void> {

        const emailAddress = event.dni+UgelDomainDiccionary.getDomain(event.ugel as Ugel);
        if(await this.emailProvisioner.exists(emailAddress)) {
            console.log("El correo ya existe en Google, asociándolo al perfil del estudiante...");
            // Si el correo ya existe en Google, lo asociamos al perfil del estudiante

            const command: CreateEmailAccountCommand = new CreateEmailAccountCommand(
                emailAddress ,
                undefined

            );
            const persistedEmail = await this.emailAccountCommandService.HandleCreateEmailAccount(command);
            await this.externalStudentProfileService.updateStudentEmail(event.studentId, persistedEmail);
            await this.externalStudentProfileService.activateStudentProfile(event.studentId);
            return;

        }else if(await this.emailAccountQueryService.getByDni(event.dni)){
            const foundEmail = await this.emailAccountQueryService.getByDni(event.dni);
            await this.externalStudentProfileService.updateStudentEmail(event.studentId, foundEmail.emailAddress);
            return;
        }
    }

}