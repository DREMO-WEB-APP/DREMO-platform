import {EmailProvisioner} from "./email-provisioner.port";
import {admin_directory_v1, google} from "googleapis";
import {EmailInformation} from "./email-information";



export class GoogleEmailProvisioner implements EmailProvisioner {
    private admin: admin_directory_v1.Admin;

    constructor() {
        const auth = new google.auth.JWT({
            email: process.env.GSA_CLIENT_EMAIL,
            key: process.env.GSA_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/admin.directory.user'],
            subject: process.env.WORKSPACE_ADMIN_EMAIL,
        });

        this.admin = google.admin({
            version: 'directory_v1',
            auth,
        });
    }

    async provision(input: {
        email: string;
        tempPassword: string;
        firstName: string;
        lastName: string;
    }): Promise<void> {
        try {
            await this.admin.users.insert({
                requestBody: {
                    primaryEmail: input.email,
                    name: {
                        givenName: input.firstName,
                        familyName: input.lastName,
                    },
                    password: input.tempPassword,
                    changePasswordAtNextLogin: true,
                },
            });
        } catch (error: any) {
            // Traduce errores técnicos a algo entendible
            if (error.code === 409) {
                throw new Error(`El correo ${input.email} ya existe en Google`);
            }
            if (error.code === 403) {
                throw new Error('Permisos insuficientes para crear correos');
            }
            throw error;
        }
    }


    async exists(email: string): Promise<boolean> {
        try {
            await this.admin.users.get({ userKey: email });
            return true; // Si no lanza error, el usuario existe
        } catch (error: any) {
            if (error.code === 404) {
                return false; // Usuario no encontrado, no existe
            }
            throw error; // Otros errores se relanzan
        }
    }

    async getProfile(email:string): Promise<EmailInformation> {
        try {
            const res = await this.admin.users.get({ userKey: email });
            const user = res.data;
            return {
                email: user.primaryEmail || '',
                name: `${user.name?.givenName || ''} ${user.name?.familyName || ''}`.trim(),
                suspended: !!user.suspended,
                lastLoginTime: user.lastLoginTime ? new Date(user.lastLoginTime) : null,
                orgUnitPath: user.orgUnitPath || '',
            };
        } catch (error: any) {
            if (error.code === 404) {
                throw new Error(`El correo ${email} no existe en Google`);
            }
            throw error;
        }
    }




}
