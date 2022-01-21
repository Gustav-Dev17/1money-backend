"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableItems1640634248679 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableItems1640634248679 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
                {
                    name: "discount",
                    type: "float",
                    isNullable: true,
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("items");
    }
}
exports.CreateTableItems1640634248679 = CreateTableItems1640634248679;
