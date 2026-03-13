import {Admin} from "../model/aggregates/admin";

export interface IAdminProfileQueryService {

    getAdminProfileById(adminId: number): Promise<Admin>;
}