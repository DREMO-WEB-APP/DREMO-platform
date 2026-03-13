import {EventBus, EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {RequestReviewedEvent} from "../../../../requests/domain/events/request-reviewed.event";
import {EmailAccountCommandService} from "../email-account-command.service";
import {CreateEmailAccountCommand} from "../../../domain/model/commands/create-email-account.command";
import {ExternalStudentProfileService} from "../outbound-services/external-student-profile.service";
import {EmailAccountCreatedEvent} from "../../../domain/events/email-account-created.event";
import {UgelDomainDiccionary} from "../../utils/ugel-domain.diccionary";
import {Ugel} from "../../../../institutions/domain/model/value-objects/Ugel";


@EventsHandler(RequestReviewedEvent)
export class RequestReviewedHandler
    implements IEventHandler<RequestReviewedEvent> {

    constructor(
        private readonly emailAccountCommandService: EmailAccountCommandService,
        private readonly externalStudentProfileService: ExternalStudentProfileService,
        private readonly eventBus:EventBus,
        private readonly ugelDomain: UgelDomainDiccionary,
        ) {}

    async handle(event: RequestReviewedEvent) {
        if (event.response !== 'APPROVED') return;

        const studentProfile = await this.externalStudentProfileService.getStudentProfileById(event.studentId);
        if (!studentProfile) {
            throw new Error(`Student profile with ID ${event.studentId} not found.`);
        }
        if(studentProfile.emailAccountId != null){
            throw new Error(`Student profile with ID ${event.studentId} already has an associated email account.`);
        }



        const emailAddress = studentProfile.dni + UgelDomainDiccionary.getDomain(studentProfile.institute.UGEL);
        const tempPassword = Math.random().toString(36).slice(-15); // Genera una contraseña temporal simple

        const command: CreateEmailAccountCommand= new CreateEmailAccountCommand(emailAddress,tempPassword);
        const createdEmailAccount = await this.emailAccountCommandService.HandleCreateEmailAccount(command);

        this.eventBus.publish(
            new EmailAccountCreatedEvent(
                createdEmailAccount,
                studentProfile.id
            )
        )

    }
}