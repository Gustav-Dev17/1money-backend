import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTablePurchases1640633288719 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "purchases",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "payment",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "situation",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "discount",
            type: "float",
            isNullable: true,
          },
          {
            name: "total_price",
            type: "float",
            isNullable: false,
          },
          {
            name: "final_price",
            type: "float",
            isNullable: false,
          },
          {
            name: "bought_at",
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
                name: "fk_purchases",
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id']
            }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("purchases");
  }
}