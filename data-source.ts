import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import {Account} from "./src/iam/domain/model/aggregates/account";
import {Role} from "./src/iam/domain/model/entities/role";
import {Student} from "./src/profiles/domain/model/aggregates/student";
import {EmailAccount} from "./src/emails/domain/model/aggregates/EmailAccount";
import {Admin} from "./src/profiles/domain/model/aggregates/Admin";
import {Request} from "./src/requests/domain/model/aggregates/Request";
import {Institute} from "./src/institutions/domain/model/entities/institute";
import {Teacher} from "./src/profiles/domain/model/aggregates/teacher";
import {Invitation} from "./src/profiles/domain/model/aggregates/invitation";
dotenv.config();

export default new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    //entities: [Account,Role,Student,Admin,Teacher,EmailAccount,Request,Institute,Invitation],

    //OJO, ACA CAMBIAR A '/migrations/*.ts' para probar en local
    migrations: [  __dirname + '/migrations/*.js'],
    synchronize: false, // MUST BE FALSE for migrations!
});