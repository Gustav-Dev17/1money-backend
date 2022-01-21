"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableCourses1640565085599 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableCourses1640565085599 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "courses",
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
                    isUnique: true,
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "duration",
                    type: "varchar",
                },
                {
                    name: "price",
                    type: "float",
                },
                {
                    name: "discount",
                    type: "float",
                    isNullable: true,
                },
                {
                    name: "cover",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "prevideo",
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
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("courses");
    }
}
exports.CreateTableCourses1640565085599 = CreateTableCourses1640565085599;
