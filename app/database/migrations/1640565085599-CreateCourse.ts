import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCourse1640565085599 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "courses",
              columns: [
                {
                  name: "id",
                  type: "varchar",
                  isPrimary: true,
                  generationStrategy: "uuid"
                },
                {
                  name: "name",
                  type: "varchar",
                  isUnique: true,
                },
                {
                  name: "description",
                  type: "varchar",
                  isNullable: false,
                },
                {
                  name: "price",
                  type: "float",
                  isNullable: false,
                },
                {
                  name: "cover",
                  type: "varchar",
                  isNullable: false,
                },
                {
                  name: "prevideo",
                  type: "varchar",
                },
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("courses")
    }

}