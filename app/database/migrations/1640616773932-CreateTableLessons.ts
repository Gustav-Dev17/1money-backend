import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableLesson1640616773932 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "lessons",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "sequence",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "duration",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "video",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "resource",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "key",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "course_id",
            type: "varchar",
          },
        ],

        foreignKeys: [
          {
            name: "fk_lessons",
            columnNames: ["course_id"],
            referencedTableName: "courses",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("lessons");
  }
}
