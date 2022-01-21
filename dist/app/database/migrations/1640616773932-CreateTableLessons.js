"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableLesson1640616773932 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableLesson1640616773932 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "lessons",
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
                },
                {
                    name: "sequence",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "duration",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "video",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "resource",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "key",
                    type: "varchar",
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
                    name: "course_id",
                    type: "varchar",
                },
            ],
            foreignKeys: [
                {
                    name: "fk_lessons",
                    columnNames: ["course_id"],
                    referencedTableName: "courses",
                    referencedColumnNames: ["id"],
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("lessons");
    }
}
exports.CreateTableLesson1640616773932 = CreateTableLesson1640616773932;
