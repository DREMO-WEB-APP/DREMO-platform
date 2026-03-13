import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingEmailToStudents1769007907164 implements MigrationInterface {
    name = 'AddingEmailToStudents1769007907164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`email_account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email_address\` varchar(255) NOT NULL, \`encrypted_password\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL, UNIQUE INDEX \`IDX_2285362ca6c1d05c8d703554c1\` (\`email_address\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`email_account_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD UNIQUE INDEX \`IDX_f6b7f97d48e1e4740e14a6fe47\` (\`email_account_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_f6b7f97d48e1e4740e14a6fe47\` ON \`student\` (\`email_account_id\`)`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_f6b7f97d48e1e4740e14a6fe473\` FOREIGN KEY (\`email_account_id\`) REFERENCES \`email_account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_f6b7f97d48e1e4740e14a6fe473\``);
        await queryRunner.query(`DROP INDEX \`REL_f6b7f97d48e1e4740e14a6fe47\` ON \`student\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP INDEX \`IDX_f6b7f97d48e1e4740e14a6fe47\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`email_account_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_2285362ca6c1d05c8d703554c1\` ON \`email_account\``);
        await queryRunner.query(`DROP TABLE \`email_account\``);
    }

}
