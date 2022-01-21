"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableCards1640738468745 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableCards1640738468745 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
                    name: "exp_month",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "exp_year",
                    type: "varchar",
                    isNullable: false,
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("cards");
    }
}
exports.CreateTableCards1640738468745 = CreateTableCards1640738468745;
