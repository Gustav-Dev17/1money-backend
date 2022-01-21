"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUsers1640632302094 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableUsers1640632302094 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                    generationStrategy: "uuid",
                },
                {
                    name: 'usertype',
                    type: 'enum',
                    enum: ['U', 'A'],
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "email",
                    type: "varchar",
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "picture",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "key",
                    type: "varchar",
                    isNullable: true,
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
        await queryRunner.dropTable("users");
    }
}
exports.CreateTableUsers1640632302094 = CreateTableUsers1640632302094;
