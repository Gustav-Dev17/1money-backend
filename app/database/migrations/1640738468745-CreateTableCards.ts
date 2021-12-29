import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableCards1640738468745 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cards",
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
            isNullable: false,
          },
          {
            name: "cpf",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "number",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "expiration",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "security_cod",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "user_id",
            type: "varchar"
          }
        ],

        foreignKeys: [
            {
                name: "fk_cards",
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id']
            }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cards");
  }
}