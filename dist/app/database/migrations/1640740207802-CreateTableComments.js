"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableComments1640740207802 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableComments1640740207802 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("comments");
    }
}
exports.CreateTableComments1640740207802 = CreateTableComments1640740207802;
