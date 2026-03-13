import {BaseRepository} from "../../../../../shared/infrastructure/persistence/typeorm/repositories/base-repository";
import {Student} from "../../../../domain/model/aggregates/student";
import {Injectable} from "@nestjs/common";
import {IStudentProfileRepository} from "../../../../domain/repositories/i-student-profile-repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class StudentProfileRepository extends BaseRepository<Student>
       implements IStudentProfileRepository<Student> {
    constructor(
        @InjectRepository(Student)
        private readonly StudentProfileRepository: Repository<Student>,
    ) {
        super(StudentProfileRepository);
    }

    findCompleteProfileByStudentIdAsync(studentId: number): Promise<Student> {
        return this.StudentProfileRepository.findOne({
            where: {id: studentId},
            relations: ['emailAccount', 'institute'],
        });
    }

    findByStudentIdWithInstituteAsync(studentId: number): Promise<Student> {
        return this.StudentProfileRepository.findOne({
            where: {id: studentId},
            relations: ['emailAccount'],
        });
    }


    findByInstituteIdAsync(instituteId: number): Promise<Student[]> {
        return this.StudentProfileRepository.find({where: {institute: {id: instituteId}}});
    }

    findByAccountIdAsync(accountId: number): Promise<Student> {
        return this.StudentProfileRepository.findOne({where: {accountId}});
    }

    findByStudentIdAsync(id: number): Promise<Student> {
        return this.StudentProfileRepository.findOne({where: {id}});
    }

    findByDniAsync(dni: string): Promise<Student> {
        return this.StudentProfileRepository.findOne({where: {dni}});
    }

    findAllStudentProfilesAsync(): Promise<Student[]> {
        return this.StudentProfileRepository.find();
    }
}