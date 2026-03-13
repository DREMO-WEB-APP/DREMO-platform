import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingCommentsToRequest1770656318160 implements MigrationInterface {
    name = 'AddingCommentsToRequest1770656318160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`institute_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_46563000c28da145755c0bbd77e\` FOREIGN KEY (\`institute_id\`) REFERENCES \`institutes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_46563000c28da145755c0bbd77e\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`institute_id\``);
    }

}
