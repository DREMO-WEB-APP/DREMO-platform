import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingCommentsToRequest1770643464744 implements MigrationInterface {
    name = 'AddingCommentsToRequest1770643464744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`institutes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`institute_code\` varchar(20) NOT NULL, \`local_code\` varchar(20) NOT NULL, \`institute_name\` varchar(100) NOT NULL, \`niv_mod\` enum ('Escuela Superior Pedagógica', 'Instituto Superior Tecnológico', 'Inicial - Jardín', 'Inicial - Cuna-jardín', 'Secundaria', 'Primaria', 'Básica Alternativa-Inicial e Intermedio', 'Básica Especial-Primaria', 'Educación Ocupacional', 'Técnico Productiva', 'Básica Alternativa-Avanzado', 'Primaria de Adultos') NOT NULL, \`institute_address\` varchar(200) NOT NULL, UNIQUE INDEX \`IDX_5a6f061dd3cd52c9b86447dc16\` (\`institute_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_5a6f061dd3cd52c9b86447dc16\` ON \`institutes\``);
        await queryRunner.query(`DROP TABLE \`institutes\``);
    }

}
