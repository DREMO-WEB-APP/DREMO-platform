import {Admin} from "../model/aggregates/Admin";

export interface IAdminProfileQueryService {

    getAdminProfileById(adminId: number): Promise<Admin>;
}