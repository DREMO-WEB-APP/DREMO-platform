import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScheduleModule} from "@nestjs/schedule";
import {AuthModule} from "./iam/infrastructure/auth/auth.module";
import {HashingModule} from "./iam/infrastructure/hashing/hashing.module";
import {IamModule} from "./iam/iam.module";
import {UnitOfWorkService} from "./shared/infrastructure/persistence/typeorm/unit-of-work.service";
import {ProfilesModule} from "./profiles/profiles.module";
import {EmailsModule} from "./emails/emails.module";
import {RequestsModule} from "./requests/request.module";
import {InstitutesModule} from "./institutions/institutes.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DATABASE'),
                autoLoadEntities: true,
                synchronize: false // NEVER SET TO TRUE IN PRODUCTION or you will lose data! te estoy viendo Sihuar ctmr.
            })
        }),
        AuthModule,
        HashingModule,
        IamModule,
        ProfilesModule,
        EmailsModule,
        RequestsModule,
        InstitutesModule,
        TypeOrmModule.forFeature([]),
        ScheduleModule.forRoot(),
    ],
    // providers: [AppService, AuthJwtService, CryptoService],
    providers: [UnitOfWorkService],
})
export class AppModule {}
