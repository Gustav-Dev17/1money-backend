"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const multer = require("multer");
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path_1.default.resolve(__dirname, "..", "..", "tmp", "uploads"));
        },
        filename: (req, file, cb) => {
            crypto_1.default.randomBytes(16, (err, hash) => {
                if (err)
                    cb(err);
                file.key = `${hash.toString("hex")}-${file.originalname}`;
                cb(null, file.key);
            });
        },
    }),
    s3: (0, multer_s3_1.default)({
        s3: new aws_sdk_1.default.S3(),
        bucket: "uploadfileteste2",
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, cb) => {
            crypto_1.default.randomBytes(16, (err, hash) => {
                if (err)
                    cb(err);
                const filename = `${hash.toString("hex")}-${file.originalname}`;
                cb(null, filename);
            });
        },
    }),
};
module.exports = {
    dest: path_1.default.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: storageTypes["s3"],
    fileFilter: (req, file, cb) => {
        const allowedMines = ["video/mp4"];
        if (allowedMines.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Invalid file type"));
        }
    },
};
