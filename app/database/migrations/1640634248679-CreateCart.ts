import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCart1640634248679 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cart",
        columns: [
          {
            name: "purchase_id",
            type: "varchar"
          },
          {
            name: "course_id",
            type: "varchar"
          },
          {
            name: "total_price",
            type: "float",
            isNullable: false,
          },
        ],

        foreignKeys: [
            {
                name: "fk_cart_purchase",
                columnNames: ['purchase_id'],
                referencedTableName: 'purchases',
                referencedColumnNames: ['id']
            },
            {
                name: "fk_cart_course",
                columnNames: ['course_id'],
                referencedTableName: 'courses',
                referencedColumnNames: ['id']
            }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cart");
  }
}