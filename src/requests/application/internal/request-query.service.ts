import { Inject, Injectable } from "@nestjs/common";
import { REQUEST_REPOSITORY_TOKEN } from "../../domain/repositories/request-repository.token";
import { IRequestRepository } from "../../domain/repositories/i-request-repository";
import { Request } from "../../domain/model/aggregates/Request";
import {IRequestQueryService} from "../../domain/services/i-request-query-service";

@Injectable()
export class RequestQueryService implements IRequestQueryService {
  constructor(
    @Inject(REQUEST_REPOSITORY_TOKEN)
    private readonly requestRepository: IRequestRepository<Request>,
  ) {}
    async getById(requestId: number): Promise<Request | null> {
        return await this.requestRepository.findByIdAsync(requestId);
    }
    async getByStudentId(studentId: number): Promise<Request | null> {
        const foundRequest =  await this.requestRepository.findByStudentIdAsync(studentId);
        if(!foundRequest){
            return null;
        }
        return foundRequest;
    }
    async getAll(): Promise<Request[]> {
        return this.requestRepository.findAllRequestAsync();
    }
    async getAllPendingRequests(): Promise<Request[]> {
        return await this.requestRepository.findAllPendingRequestsAsync();
    }
}
