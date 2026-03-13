import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingCommentsToRequest1769699821044 implements MigrationInterface {
    name = 'AddingCommentsToRequest1769699821044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`admin\` ADD \`account_id\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`admin\` DROP COLUMN \`account_id\``);
    }

}
