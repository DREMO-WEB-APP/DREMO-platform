import {Column, Entity} from "typeorm";
import {User} from "./User.entity";


@Entity()
export class Admin extends User{



    @Column({name: "account_id"})
    accountId: number;



    static constructAdminProfileFromCommand(accountId: number): Admin {
        const admin = new Admin();
        admin.accountId = accountId;
        return admin;
    }




}