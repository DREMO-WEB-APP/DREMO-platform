import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingCommentsToRequest1770647177629 implements MigrationInterface {
    name = 'AddingCommentsToRequest1770647177629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`institutes\` CHANGE \`niv_mod\` \`niv_mod\` enum ('Escuela Superior Pedagógica', 'Instituto Superior Tecnológico', 'Inicial - Jardín', 'Inicial - Cuna-jardín', 'Secundaria', 'Primaria', 'Básica Alternativa-Inicial e Intermedio', 'Básica Especial-Primaria', 'Educación Ocupacional', 'Técnico Productiva', 'Básica Alternativa-Avanzado', 'Primaria de Adultos', 'Instituto Superior Pedagógico', 'Secundaria de Adultos', 'Básica Especial', 'Inicial - Cuna', 'Básica Especial-Inicial') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`institutes\` CHANGE \`niv_mod\` \`niv_mod\` enum ('Escuela Superior Pedagógica', 'Instituto Superior Tecnológico', 'Inicial - Jardín', 'Inicial - Cuna-jardín', 'Secundaria', 'Primaria', 'Básica Alternativa-Inicial e Intermedio', 'Básica Especial-Primaria', 'Educación Ocupacional', 'Técnico Productiva', 'Básica Alternativa-Avanzado', 'Primaria de Adultos', 'Instituto Superior Pedagógico', 'Secundaria de Adultos', 'Básica Especial', 'Inicial - Cuna') NOT NULL`);
    }

}
