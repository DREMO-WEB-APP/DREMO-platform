import {Injectable} from "@nestjs/common";
import {BaseRepository} from "../../../../../shared/infrastructure/persistence/typeorm/repositories/base-repository";
import {IEmailAccountRepository} from "../../../../domain/repositories/i-email-account-repository";
import {InjectRepository} from "@nestjs/typeorm";
import {EmailAccount} from "../../../../domain/model/aggregates/EmailAccount";
import {Repository, Like} from "typeorm";


@Injectable()
export class EmailAccountRepository extends BaseRepository<EmailAccount>
       implements IEmailAccountRepository<EmailAccount>{

    constructor(
        @InjectRepository(EmailAccount)
        private readonly emailAccountRepository: Repository<EmailAccount>
    ) {
        super(emailAccountRepository);
    }


    async findByDniAsync(dni: string): Promise<EmailAccount | null> {
        return this.emailAccountRepository.findOne({
            where: { emailAddress: Like(`${dni}%`) },
        });
    }

    findByEmailAddressAsync(emailAddress: string): Promise<EmailAccount | null> {
        return this.emailAccountRepository.findOne({ where: { emailAddress } });
    }

}