import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserStatus} from "../value-objects/UserStatus";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;


    @Column({
        name: "user_status",
        type: "enum",
        enum: UserStatus,
        default: UserStatus.INACTIVE
    })
    userStatus: UserStatus;

}