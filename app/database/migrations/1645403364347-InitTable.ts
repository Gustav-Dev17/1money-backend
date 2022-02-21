import {MigrationInterface, QueryRunner} from "typeorm";

export class InitTable1645403364347 implements MigrationInterface {
    name = 'InitTable1645403364347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(255) NOT NULL, \`usertype\` enum ('A', 'U') NOT NULL DEFAULT 'U', \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`picture\` varchar(255) NOT NULL, \`key\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`actions\` (\`id\` varchar(255) NOT NULL, \`payment\` varchar(255) NOT NULL, \`situation\` enum ('CO', 'CA', 'FA') NOT NULL, \`discount\` int NOT NULL, \`total_price\` int NOT NULL, \`final_price\` int NOT NULL, \`bought_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`courses\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`duration\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`discount\` int NOT NULL, \`cover\` varchar(255) NOT NULL, \`keycover\` varchar(255) NOT NULL, \`prevideo\` varchar(255) NOT NULL, \`keyprevideo\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lessons\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`sequence\` varchar(255) NOT NULL, \`duration\` varchar(255) NOT NULL, \`video\` varchar(255) NOT NULL, \`key\` varchar(255) NOT NULL, \`resource\` varchar(255) NOT NULL, \`course_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` varchar(255) NOT NULL, \`text\` varchar(255) NOT NULL, \`lesson_id\` varchar(255) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`answers\` (\`id\` varchar(255) NOT NULL, \`text\` varchar(255) NOT NULL, \`comment_id\` varchar(255) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cards\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`cpf\` varchar(255) NOT NULL, \`number\` varchar(255) NOT NULL, \`exp_month\` varchar(255) NOT NULL, \`exp_year\` varchar(255) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`items\` (\`id\` varchar(255) NOT NULL, \`action_id\` varchar(255) NOT NULL, \`course_id\` varchar(255) NOT NULL, \`total_price\` int NOT NULL, \`discount\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`actions\` ADD CONSTRAINT \`FK_314aaf9c37b61b0a1267c1f4b59\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lessons\` ADD CONSTRAINT \`FK_3c4e299cf8ed04093935e2e22fe\` FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_65d99dcda0000a2cae7a68f9fc5\` FOREIGN KEY (\`lesson_id\`) REFERENCES \`lessons\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_4c675567d2a58f0b07cef09c13d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answers\` ADD CONSTRAINT \`FK_69dd17428c13a8ef65e9afb34a2\` FOREIGN KEY (\`comment_id\`) REFERENCES \`comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answers\` ADD CONSTRAINT \`FK_f4cf663ebeca05b7a12f6a2cc97\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_1c54b595af68cc3870b651e11c9\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_ed82a0965d7b44b07277bc8a226\` FOREIGN KEY (\`action_id\`) REFERENCES \`actions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_baa163cba680b30ba12bdd2eb3e\` FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_baa163cba680b30ba12bdd2eb3e\``);
        await queryRunner.query(`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_ed82a0965d7b44b07277bc8a226\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_1c54b595af68cc3870b651e11c9\``);
        await queryRunner.query(`ALTER TABLE \`answers\` DROP FOREIGN KEY \`FK_f4cf663ebeca05b7a12f6a2cc97\``);
        await queryRunner.query(`ALTER TABLE \`answers\` DROP FOREIGN KEY \`FK_69dd17428c13a8ef65e9afb34a2\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4c675567d2a58f0b07cef09c13d\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_65d99dcda0000a2cae7a68f9fc5\``);
        await queryRunner.query(`ALTER TABLE \`lessons\` DROP FOREIGN KEY \`FK_3c4e299cf8ed04093935e2e22fe\``);
        await queryRunner.query(`ALTER TABLE \`actions\` DROP FOREIGN KEY \`FK_314aaf9c37b61b0a1267c1f4b59\``);
        await queryRunner.query(`DROP TABLE \`items\``);
        await queryRunner.query(`DROP TABLE \`cards\``);
        await queryRunner.query(`DROP TABLE \`answers\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
        await queryRunner.query(`DROP TABLE \`lessons\``);
        await queryRunner.query(`DROP TABLE \`courses\``);
        await queryRunner.query(`DROP TABLE \`actions\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
