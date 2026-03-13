export interface EmailProvisioner {
    provision(input: {
        email: string;
        tempPassword: string;
        firstName: string;
        lastName: string;
    }): Promise<void>;
}
