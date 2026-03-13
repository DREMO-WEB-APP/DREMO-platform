import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatingEmailTimestamp1769096000028 implements MigrationInterface {
    name = 'UpdatingEmailTimestamp1769096000028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`request\` ADD CONSTRAINT \`FK_0da07e7d813dc2376c4da3aeb8b\` FOREIGN KEY (\`reviewed_by\`) REFERENCES \`admin\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`request\` DROP FOREIGN KEY \`FK_0da07e7d813dc2376c4da3aeb8b\``);
    }

}
