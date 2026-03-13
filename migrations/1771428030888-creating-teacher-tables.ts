import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingTeacherTables1771428030888 implements MigrationInterface {
    name = 'CreatingTeacherTables1771428030888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`teacher\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE', \`account_id\` int NOT NULL, \`dni\` varchar(255) NOT NULL, \`names\` varchar(255) NOT NULL, \`last_names\` varchar(255) NOT NULL, \`institute_id\` int NOT NULL, UNIQUE INDEX \`IDX_fdaee0a43ff7bf64b1949e5386\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`teacher\` ADD CONSTRAINT \`FK_e622b99e5b142f8d7a32ff20028\` FOREIGN KEY (\`institute_id\`) REFERENCES \`institutes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`teacher\` DROP FOREIGN KEY \`FK_e622b99e5b142f8d7a32ff20028\``);
        await queryRunner.query(`DROP INDEX \`IDX_fdaee0a43ff7bf64b1949e5386\` ON \`teacher\``);
        await queryRunner.query(`DROP TABLE \`teacher\``);
    }

}
