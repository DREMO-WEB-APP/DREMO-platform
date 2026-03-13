import {User} from "./User.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToOne, RelationId} from "typeorm";
import {CreateStudentWithAccountCommand} from "../commands/create-student-with-account.command";
import {EmailAccount} from "../../../../emails/domain/model/aggregates/EmailAccount";
import {UserStatus} from "../value-objects/UserStatus";
import {Institute} from "../../../../institutions/domain/model/entities/institute";

@Entity()
export class Student extends User{

    @Column({name: "account_id"})
    accountId: number;

    @Column({unique: true, name: "dni", nullable: false})
    dni: string;

    @Column()
    names: string;

    @Column({name: "last_names"})
    lastNames: string;


    @OneToOne(() => EmailAccount, { nullable: true })
    @JoinColumn({ name: 'email_account_id' })
    emailAccount: EmailAccount | null;

    @RelationId((student: Student) => student.emailAccount)
    emailAccountId: number | null;


    @ManyToOne(() => Institute, { nullable: false })
    @JoinColumn({ name: 'institute_id' })
    institute: Institute;

    @RelationId((student: Student) => student.institute)
    instituteId: number;

    ActivateStudentProfile(): void {
        if (this.userStatus !== UserStatus.ACTIVE) {
            this.userStatus = UserStatus.ACTIVE;

        }
    }

    setInstitute(institute: Institute): void {
        this.institute = institute;
    }

    static constructStudentFromCommand(command: CreateStudentWithAccountCommand, accountId: number): Student {
        const student = new Student();
        student.accountId = accountId;
        student.dni = command.dni;
        student.names = command.names;
        student.lastNames = command.lastNames;
        return student;
    }

}