import { MigrationInterface, QueryRunner } from "typeorm";

export class IamTablesInitial1768935945129 implements MigrationInterface {
    name = 'IamTablesInitial1768935945129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`student\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE', \`account_id\` int NOT NULL, \`dni\` varchar(255) NOT NULL, \`names\` varchar(255) NOT NULL, \`last_names\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e7c9aafa64237e394ec4d8a4f7\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e7c9aafa64237e394ec4d8a4f7\` ON \`student\``);
        await queryRunner.query(`DROP TABLE \`student\``);
    }

}
