import {Ugel} from "../../../institutions/domain/model/value-objects/Ugel";

export class UgelDomainDiccionary {
    private static readonly ugelToDomain: Record<Ugel, string> = {
        [Ugel.DRE_MOQUEGUA]: '@moqueguaeduca.edu.pe',
        [Ugel.UGEL_GENERAL_SANCHEZ_CERRO]: '@ugelgsc.moqueguaeduca.edu.pe',
        [Ugel.UGEL_MARISCAL_NIETO]: '@ugelmn.moqueguaeduca.edu.pe',
        [Ugel.UGEL_SAN_IGNACIO_DE_LOYOLA_ICHUNA]: '@ugelsil.moqueguaeduca.edu.pe',
        [Ugel.UGEL_ILO]: '@ugelilo.moqueguaeduca.edu.pe',
    };

    static getDomain(ugel: Ugel): string | undefined {
        return this.ugelToDomain[ugel];
    }
}