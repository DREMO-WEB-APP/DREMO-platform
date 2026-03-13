import {Injectable} from "@nestjs/common";
import {BaseRepository} from "../../../../../shared/infrastructure/persistence/typeorm/repositories/base-repository";
import {Teacher} from "../../../../domain/model/aggregates/teacher";
import {ITeacherProfileRepository} from "../../../../domain/repositories/i-teacher-profile-repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";


@Injectable()
export class TeacherProfileRepository extends BaseRepository<Teacher>
    implements ITeacherProfileRepository<Teacher> {

    constructor(
        @InjectRepository(Teacher)
        private readonly TeacherProfileRepository: Repository<Teacher>,
    ) {
        super(TeacherProfileRepository);
    }


    findByTeacherIdAsync(teacherId: number): Promise<Teacher> {
        return this.TeacherProfileRepository.findOne({where: {id: teacherId}});
    }
    findByDniAsync(dni: string): Promise<Teacher> {
        return this.TeacherProfileRepository.findOne({where: {dni}});
    }
    findAllTeacherProfilesAsync(): Promise<Teacher[]> {
        return this.TeacherProfileRepository.find();
    }
    findByAccountIdAsync(accountId: number): Promise<Teacher> {
        return this.TeacherProfileRepository.findOne({where: {accountId}});
    }
    findByInstituteIdAsync(instituteId: number): Promise<Teacher[]> {
        return this.TeacherProfileRepository.find({where: {instituteId}});
    }


}