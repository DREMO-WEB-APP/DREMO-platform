import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {BaseRepository} from "../../../../../shared/infrastructure/persistence/typeorm/repositories/base-repository";
import {IRequestRepository} from "../../../../domain/repositories/i-request-repository";
import {Repository} from "typeorm";
import {Request} from "../../../../domain/model/aggregates/Request";
import { RequestStatus } from "../../../../domain/model/value-objects/RequestStatus";

@Injectable()
export class RequestRepository extends BaseRepository<Request>
       implements IRequestRepository<Request> {
    constructor(
        @InjectRepository(Request)
        private readonly requestRepository: Repository<Request>,
    ) {
        super(requestRepository);
    }

    findAllPendingRequestsAsync(): Promise<Request[]> {
        return this.requestRepository.find({ where: { status: RequestStatus.PENDING } });
    }

    findByStudentIdAsync(studentId: number): Promise<Request> {
        return this.requestRepository.findOne({where: {studentId}});
    }
    findAllRequestAsync(): Promise<Request[]> {
        return this.requestRepository.find();
    }


  

}