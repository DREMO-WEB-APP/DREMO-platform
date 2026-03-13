export interface EmailInformation {
    email: string;
    name: string;
    suspended: boolean;
    lastLoginTime: Date | null;
    orgUnitPath: string;
}