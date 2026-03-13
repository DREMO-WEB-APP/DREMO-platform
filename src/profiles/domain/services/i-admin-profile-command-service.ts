import {CreateAdminWithAccountCommand} from "../model/commands/create-admin-with-account.command";
import {Admin} from "../model/aggregates/admin";

export interface IAdminProfileCommandService {

    handleCreateAdminProfile(command: CreateAdminWithAccountCommand): Promise<Admin>;
}