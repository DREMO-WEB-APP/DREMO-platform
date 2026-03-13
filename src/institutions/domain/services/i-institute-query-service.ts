import {Institute} from "../model/entities/institute";
import {GetInstitutesByFilterQuery} from "../model/queries/get-institutes-by-filter.query";


export interface IInstituteQueryService{

    getAllInstitutes(): Promise<Institute[]>;
    getInstituteById(instituteId: number): Promise<Institute>;
    getInstitutesByQuery(query: GetInstitutesByFilterQuery): Promise<Institute[]>;
}