"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableActions1640633288719 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableActions1640633288719 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("actions");
    }
}
exports.CreateTableActions1640633288719 = CreateTableActions1640633288719;
