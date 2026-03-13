import {IBaseRepository} from "../../../shared/domain/repositories/i-base-repository";

export interface IInstitutesRepository<T>
        extends IBaseRepository<T>{

    findByCodModAsync(codMod: string): Promise<T>;
    findByNameAsync(name: string): Promise<T[]>;
    findByNivModAsync(nivMod: string): Promise<T[]>;
    findByQueryAsync(name?: string, nivMod?:string): Promise<T[]>;

}