import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn, RelationId
} from "typeorm";
import {Student} from "../../../../profiles/domain/model/aggregates/student";
import {RequestStatus} from "../value-objects/RequestStatus";
import {Teacher} from "../../../../profiles/domain/model/aggregates/teacher";

@Entity()
export class Request {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'student_id'})
    studentId: number;

    @OneToOne(() => Student, {eager: true})
    @JoinColumn({name: 'student_id'})
    student: Student;

    @CreateDateColumn({name: 'request_date'})
    requestDate: Date;

    @Column({
        name: "request_status",
        type: "enum",
        enum: RequestStatus,
        default: RequestStatus.PENDING
    })
    status: RequestStatus;

    @ManyToOne(() => Teacher, {eager: true, nullable: true})
    @JoinColumn({name: 'reviewed_by'})
    reviewedBy: Teacher;

    @RelationId((request: Request) => request.reviewedBy)
    reviewedById: number;

    @Column({name: "comment", type: "text", nullable: true})
    comment: string;

    @CreateDateColumn({name: 'reviewed_at', nullable: true})
    reviewedAt: Date;


}