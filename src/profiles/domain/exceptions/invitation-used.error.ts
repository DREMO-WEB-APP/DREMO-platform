import {DomainError} from "../../../shared/domain/exceptions/domain.error";


export class InvitationUsedError extends DomainError {
    readonly code = 'INVITATION_USED';
    readonly publicMessage = 'Esta invitación ya ha sido utilizada y no puede ser usada nuevamente.';

    constructor() {
        super('The invitation has already been used');
    }
}