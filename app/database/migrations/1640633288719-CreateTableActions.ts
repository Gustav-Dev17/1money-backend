import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableActions1640633288719 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "actions",
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
            name: 'situation',
            type: 'enum',
            enum: ['CA', 'CO', 'FA'],
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
                name: "fk_actions",
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id']
            }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("actions");
  }
}