import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {NivMod} from "../value-objects/niv-mod";
import {CreateInstituteCommand} from "../commands/create-institute.command";
import {Ugel} from "../value-objects/Ugel";

@Entity('institutes')
export class Institute{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20, unique: true, name: "institute_code" })
    codMod:string;

    @Column({ type: 'varchar', length: 20, name: "local_code" })
    codLocal:string;

    @Column({ type: 'varchar', length: 100, name: "institute_name" })
    name:string;

    @Column({ type: 'enum', enum: NivMod, name: "niv_mod" })
    nivMod:NivMod;

    @Column({ type: 'varchar', length: 200, name: "institute_address" })
    address:string;

    @Column({ type: 'enum', enum: Ugel, name: "ugel" })
    UGEL:Ugel;


    static constructInstituteFromCommand(command: CreateInstituteCommand): Promise<Institute> {
        const nivModValue = Object.values(NivMod).find(v => v === command.nivMod);
        if (command.nivMod === undefined || !nivModValue) {
            return Promise.reject(new Error(`Nivel o modalidad inválida: ${command.nivMod}`));
        }

        const ugelValue = Object.values(Ugel).find(v => v === command.ugel);
        if (command.ugel === undefined || !ugelValue) {
            return Promise.reject(new Error(`UGEL inválida: ${command.ugel}`));
        }


        const institute = new Institute();
        institute.codMod = command.codMod;
        institute.codLocal = command.codLocal;
        institute.name = command.name;
        institute.nivMod = nivModValue as NivMod;
        institute.address = command.address;
        institute.UGEL = ugelValue as Ugel;
        return Promise.resolve(institute);
    }

}