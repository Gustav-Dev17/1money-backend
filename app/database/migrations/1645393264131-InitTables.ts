import {MigrationInterface, QueryRunner} from "typeorm";

export class InitTables1645393264131 implements MigrationInterface {
    name = 'InitTables1645393264131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(255) NOT NULL, \`usertype\` enum ('A', 'U') NOT NULL DEFAULT 'U', \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`picture\` varchar(255) NOT NULL, \`key\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`actions\` (\`id\` varchar(255) NOT NULL, \`payment\` varchar(255) NOT NULL, \`situation\` enum ('CO', 'CA', 'FA') NOT NULL, \`discount\` int NOT NULL, \`total_price\` int NOT NULL, \`final_price\` int NOT NULL, \`bought_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cards\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`cpf\` varchar(255) NOT NULL, \`number\` varchar(255) NOT NULL, \`exp_month\` varchar(255) NOT NULL, \`exp_year\` varchar(255) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`courses\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`duration\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`discount\` int NOT NULL, \`cover\` varchar(255) NOT NULL, \`keycover\` varchar(255) NOT NULL, \`prevideo\` varchar(255) NOT NULL, \`keyprevideo\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`items\` (\`id\` varchar(255) NOT NULL, \`action_id\` varchar(255) NOT NULL, \`course_id\` varchar(255) NOT NULL, \`total_price\` int NOT NULL, \`discount\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lessons\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`sequence\` varchar(255) NOT NULL, \`duration\` varchar(255) NOT NULL, \`video\` varchar(255) NOT NULL, \`key\` varchar(255) NOT NULL, \`resource\` varchar(255) NOT NULL, \`course_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`actions\` ADD CONSTRAINT \`FK_314aaf9c37b61b0a1267c1f4b59\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_1c54b595af68cc3870b651e11c9\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_ed82a0965d7b44b07277bc8a226\` FOREIGN KEY (\`action_id\`) REFERENCES \`actions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_baa163cba680b30ba12bdd2eb3e\` FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lessons\` ADD CONSTRAINT \`FK_3c4e299cf8ed04093935e2e22fe\` FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lessons\` DROP FOREIGN KEY \`FK_3c4e299cf8ed04093935e2e22fe\``);
        await queryRunner.query(`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_baa163cba680b30ba12bdd2eb3e\``);
        await queryRunner.query(`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_ed82a0965d7b44b07277bc8a226\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_1c54b595af68cc3870b651e11c9\``);
        await queryRunner.query(`ALTER TABLE \`actions\` DROP FOREIGN KEY \`FK_314aaf9c37b61b0a1267c1f4b59\``);
        await queryRunner.query(`DROP TABLE \`lessons\``);
        await queryRunner.query(`DROP TABLE \`items\``);
        await queryRunner.query(`DROP TABLE \`courses\``);
        await queryRunner.query(`DROP TABLE \`cards\``);
        await queryRunner.query(`DROP TABLE \`actions\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
