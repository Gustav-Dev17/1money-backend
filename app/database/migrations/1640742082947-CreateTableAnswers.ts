import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableAnswers1640742082947 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "answers",
        columns: [
          {
            name: "username",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "answer",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "comment_id",
            type: "varchar"
          },
          {
            name: "user_id",
            type: "varchar"
          },
        ],
        foreignKeys: [
            {
                name: "fk_answer_comment",
                columnNames: ['comment_id'],
                referencedTableName: 'comments',
                referencedColumnNames: ['id']
            },
            {
                name: "fk_answer_user",
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id']
            }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("answers");
  }
}