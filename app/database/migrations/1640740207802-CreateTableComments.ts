import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableComments1640740207802 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "comments",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "title",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "comment",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "username",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "lesson_id",
            type: "varchar"
          },
          {
            name: "user_id",
            type: "varchar"
          },
        ],
        foreignKeys: [
            {
                name: "fk_comment_lesson",
                columnNames: ['lesson_id'],
                referencedTableName: 'lessons',
                referencedColumnNames: ['id']
            },
            {
                name: "fk_comment_user",
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id']
            }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("comments");
  }
}
