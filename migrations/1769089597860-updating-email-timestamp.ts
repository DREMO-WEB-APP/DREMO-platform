import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatingEmailTimestamp1769089597860 implements MigrationInterface {
    name = 'UpdatingEmailTimestamp1769089597860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`admin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`request\` (\`id\` int NOT NULL AUTO_INCREMENT, \`student_id\` int NOT NULL, \`request_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`request_status\` enum ('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING', \`reviewed_by\` int NULL, \`reviewed_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_85320e0f41143701f0baa242eb\` (\`student_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`request\` ADD CONSTRAINT \`FK_85320e0f41143701f0baa242eb6\` FOREIGN KEY (\`student_id\`) REFERENCES \`student\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`request\` DROP FOREIGN KEY \`FK_85320e0f41143701f0baa242eb6\``);
        await queryRunner.query(`DROP INDEX \`REL_85320e0f41143701f0baa242eb\` ON \`request\``);
        await queryRunner.query(`DROP TABLE \`request\``);
        await queryRunner.query(`DROP TABLE \`admin\``);
    }

}
