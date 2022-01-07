import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableItems1640634248679 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "items",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "action_id",
            type: "varchar",
          },
          {
            name: "course_id",
            type: "varchar",
          },
          {
            name: "total_price",
            type: "float",
            isNullable: false,
          },
        ],

        foreignKeys: [
          {
            name: "fk_items_action",
            columnNames: ["action_id"],
            referencedTableName: "actions",
            referencedColumnNames: ["id"],
          },
          {
            name: "fk_items_course",
            columnNames: ["course_id"],
            referencedTableName: "courses",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("items");
  }
}
