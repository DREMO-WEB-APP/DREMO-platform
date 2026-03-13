import {Inject, Injectable} from "@nestjs/common";
import {IRequestCommandService} from "../../domain/services/i-request-command-service";
import {REQUEST_REPOSITORY_TOKEN} from "../../domain/repositories/request-repository.token";
import {IRequestRepository} from "../../domain/repositories/i-request-repository";
import {Request} from "../../domain/model/aggregates/Request";
import {ReviewRequestCommand} from "../../domain/model/commands/review-request.command";
import {ExternalStudentProfileService} from "./outbound-service/external-student-profile.service";
import {ExternalAdminProfileService} from "./outbound-service/external-admin-profile.service";
import {RequestReviewedEvent} from "../../domain/events/request-reviewed.event";
import {EventBus} from "@nestjs/cqrs";
import {ExternalTeacherProfileService} from "./outbound-service/external-teacher-profile.service";

@Injectable()
export class RequestCommandService implements IRequestCommandService {
  constructor(
    @Inject(REQUEST_REPOSITORY_TOKEN)
    private readonly requestRepository: IRequestRepository<Request>,
    private readonly externalStudentProfileService: ExternalStudentProfileService,
    private readonly externalAdminProfileService: ExternalAdminProfileService,
    private readonly externalTeacherProfileService: ExternalTeacherProfileService,
    private readonly eventBus:EventBus,
  ) {}

  async createRequest(studentId: number): Promise<Request> {

    if(!await this.externalStudentProfileService.studentProfileExistsById(studentId)) {
        throw new Error("Student already exists");
    }
    const request = new Request();
    request.studentId = studentId;
    // status por defecto PENDING y requestDate se asignan por las columnas decoradas
    return await this.requestRepository.addAsync(request);
  }

  async deleteRequest(requestId: number): Promise<void> {
    const existing = await this.requestRepository.findByIdAsync(requestId);
    if (!existing) throw new Error("Request not found");
    await this.requestRepository.deleteAsync(existing);
  }

  async reviewRequest(command: ReviewRequestCommand): Promise<Request> {
    const existing = await this.requestRepository.findByIdAsync(command.requestId);
    if (!existing) throw new Error("Request not found");
    existing.status = command.response;
    existing.reviewedAt = new Date();
    existing.comment = command.comment;

    if(!await this.externalTeacherProfileService.teacherProfileExistsById(existing.id)) {

       /* if(!await this.externalAdminProfileService.adminProfileExistsById(command.adminId)) {
            throw new Error("Admin with Id:  does not exist");
        }*/
        throw new Error("Teacher with Id:  does not exist");
    }
    existing.reviewedBy = await this.externalTeacherProfileService.getTeacherProfileById(existing.reviewedById);

    //event emission
    this.eventBus.publish( new RequestReviewedEvent(
        command.requestId,
        existing.studentId,
        command.teacherId,
        command.response,
        command.comment,
        ));
    return await this.requestRepository.updateAsync(existing);
  }
}