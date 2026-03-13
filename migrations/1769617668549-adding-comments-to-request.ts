import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingCommentsToRequest1769617668549 implements MigrationInterface {
    name = 'AddingCommentsToRequest1769617668549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`request\` ADD \`comment\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`request\` DROP COLUMN \`comment\``);
    }

}
