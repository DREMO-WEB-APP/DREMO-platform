import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatingEmailTimestamp1769014869875 implements MigrationInterface {
    name = 'UpdatingEmailTimestamp1769014869875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_f6b7f97d48e1e4740e14a6fe47\` ON \`student\``);
        await queryRunner.query(`ALTER TABLE \`email_account\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_account\` CHANGE \`created_at\` \`created_at\` timestamp(0) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_f6b7f97d48e1e4740e14a6fe47\` ON \`student\` (\`email_account_id\`)`);
    }

}
