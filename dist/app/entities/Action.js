"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actions = exports.ActionSituation = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const User_1 = require("./User");
var ActionSituation;
(function (ActionSituation) {
    ActionSituation["CO"] = "CO";
    ActionSituation["CA"] = "CA";
    ActionSituation["FA"] = "FA";
})(ActionSituation = exports.ActionSituation || (exports.ActionSituation = {}));
let Actions = class Actions {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Actions.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Actions.prototype, "payment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "situation",
        type: "enum",
        enum: ActionSituation,
    }),
    __metadata("design:type", String)
], Actions.prototype, "situation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Actions.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Actions.prototype, "total_price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Actions.prototype, "final_price", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Actions.prototype, "bought_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Actions.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.Users),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_1.Users)
], Actions.prototype, "user", void 0);
Actions = __decorate([
    (0, typeorm_1.Entity)("actions"),
    __metadata("design:paramtypes", [])
], Actions);
exports.Actions = Actions;
