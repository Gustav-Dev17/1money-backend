"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableAnswers1640742082947 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableAnswers1640742082947 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("answers");
    }
}
exports.CreateTableAnswers1640742082947 = CreateTableAnswers1640742082947;
