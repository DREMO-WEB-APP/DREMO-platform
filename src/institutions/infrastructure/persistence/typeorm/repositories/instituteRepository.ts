import {BaseRepository} from "../../../../../shared/infrastructure/persistence/typeorm/repositories/base-repository";
import {Institute} from "../../../../domain/model/entities/institute";
import {IInstitutesRepository} from "../../../../domain/repositories/i-institutes-repository";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {NivMod} from "../../../../domain/model/value-objects/niv-mod";

@Injectable()
export class InstituteRepository extends BaseRepository<Institute>
        implements IInstitutesRepository<Institute>{

    constructor(
        @InjectRepository(Institute)
        private readonly instituteRepository: Repository<Institute>,
    ) {
        super(instituteRepository);
    }

    async findByQueryAsync(name?: string, nivMod?: NivMod): Promise<Institute[]> {
        const query = this.instituteRepository.createQueryBuilder('institute');

        if (name) {
            query.andWhere('LOWER(institute.name) LIKE :name', { name: `%${name.toLowerCase()}%` });
        }
        if (nivMod) {
            query.andWhere('institute.nivMod = :nivMod', { nivMod });
        }

        return await query.getMany();
    }

    findByCodModAsync(codMod: string): Promise<Institute> {
        throw new Error("Method not implemented.");
    }
    findByNameAsync(name: string): Promise<Institute[]> {
        throw new Error("Method not implemented.");
    }
    findByNivModAsync(nivMod: string): Promise<Institute[]> {
        throw new Error("Method not implemented.");
    }

}