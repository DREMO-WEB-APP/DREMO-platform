

export abstract class DomainError extends Error{
    abstract readonly code: string;
    abstract readonly publicMessage: string;
    readonly internalMessage: string;

    protected constructor(internalMessage: string) {
        super(internalMessage);
        this.internalMessage = internalMessage;
    }
}