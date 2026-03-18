import {BaseRepository} from "../../../../../shared/infrastructure/persistence/typeorm/repositories/base-repository";
import {IAdminProfileRepository} from "../../../../domain/repositories/i-admin-profile-repository";
import {Admin} from "../../../../domain/model/aggregates/Admin";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class AdminProfileRepository extends BaseRepository<Admin>
    implements IAdminProfileRepository<Admin> {

    constructor(
        @InjectRepository(Admin)
        private readonly  AdminProfileRepository: Repository<Admin>
    ) {
        super(AdminProfileRepository);
    }


}
