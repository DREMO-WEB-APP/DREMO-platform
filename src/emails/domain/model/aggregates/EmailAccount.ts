import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {CreateEmailAccountCommand} from "../commands/create-email-account.command";

@Entity('email_account')
export class EmailAccount{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, name: "email_address", nullable: false})
    emailAddress: string;

    @Column({name: "encrypted_password", nullable: true})
    encryptedPassword: string;

    @CreateDateColumn({name: "created_at", type: 'timestamp'})
    createdAt: Date;

    static constructEmailAccountFromCommand(command: CreateEmailAccountCommand):EmailAccount {
        const emailAccount = new EmailAccount();
        emailAccount.emailAddress = command.emailAddress;
        emailAccount.encryptedPassword = command.encryptedPassword;
        return emailAccount;
    }
}