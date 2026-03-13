import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {EmailAccountCreatedEvent} from "../../../../emails/domain/events/email-account-created.event";
import {StudentProfileCommandService} from "../Command-Services/student-profile-command.service";


@EventsHandler(EmailAccountCreatedEvent)
export class EmailAccountCreatedHandler
    implements IEventHandler<EmailAccountCreatedEvent>{

    constructor(private readonly studentProfileCommandService: StudentProfileCommandService) {
    }

    async handle(event: EmailAccountCreatedEvent){

        await this.studentProfileCommandService.
        handleUpdateStudentEmailAddress(event.studentId,event.email)

    }


}