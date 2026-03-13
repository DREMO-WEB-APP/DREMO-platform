import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatingInstituteToIncludeUgel1772463785392 implements MigrationInterface {
    name = 'UpdatingInstituteToIncludeUgel1772463785392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`institutes\` ADD \`ugel\` enum ('DRE MOQUEGUA', 'UGEL GENERAL SANCHEZ CERRO', 'UGEL MARISCAL NIETO', 'UGEL SAN IGNACIO DE LOYOLA-ICHUÑA', 'UGEL ILO') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_account\` CHANGE \`encrypted_password\` \`encrypted_password\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_account\` CHANGE \`encrypted_password\` \`encrypted_password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`institutes\` DROP COLUMN \`ugel\``);
    }

}
