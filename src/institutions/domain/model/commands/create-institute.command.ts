
export class CreateInstituteCommand{
    constructor(
        public readonly codMod: string,
        public readonly codLocal:string,
        public readonly name: string,
        public readonly nivMod: string,
        public readonly address: string,
        public readonly ugel: string,
    ){}
}