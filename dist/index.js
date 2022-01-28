"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv").config();
require("./app/database");
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./app/routes/userRoute"));
const adminRoute_1 = __importDefault(require("./app/routes/adminRoute"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const options = {
    origin: 'http://localhost:3000',
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // preflightContinue: false,
    // optionsSuccessStatus: 204,
    credentials: true
};
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)(options));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/users", userRoute_1.default);
app.use("/admin", adminRoute_1.default);
app.listen(3000, () => console.log("Server is running"));
