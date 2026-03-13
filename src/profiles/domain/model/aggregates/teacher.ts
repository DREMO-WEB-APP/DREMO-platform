import {User} from "./User.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToOne, RelationId} from "typeorm";
import {Institute} from "../../../../institutions/domain/model/entities/institute";
import {Student} from "./student";
import {CreateTeacherWithAccountCommand} from "../commands/create-teacher-with-account.command";

@Entity()
export class Teacher extends User{

    @Column({name: "account_id"})
    accountId: number;

    @Column({unique: true, name: "dni", nullable: false})
    dni: string;

    @Column()
    names: string;

    @Column({name: "last_names"})
    lastNames: string;

    @ManyToOne(() => Institute, { nullable: false })
    @JoinColumn({ name: 'institute_id' })
    institute: Institute;

    @RelationId((student: Student) => student.institute)
    instituteId: number;


    static constructTeacherFromCommand(command: CreateTeacherWithAccountCommand, accountId: number): Teacher {
        const teacher = new Teacher();
        teacher.accountId = accountId;
        teacher.dni = command.dni;
        teacher.names = command.names;
        teacher.lastNames = command.lastNames;
        return teacher;
    }

    setInstitute(institute: Institute): void {
        this.institute = institute;
    }


}