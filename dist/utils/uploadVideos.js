"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideo = exports.uploadVideos = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3();
const uploadVideos = async (buffer, photo) => {
    const awsUpload = await s3
        .upload({
        Bucket: "uploadfileteste2",
        Key: `${Date.now()}-${photo.originalname}`,
        Body: buffer,
        ACL: "public-read",
        ContentType: "video/mp4",
    }, (err) => {
        if (err) {
            console.log("Error", err);
        }
    })
        .promise();
    return awsUpload;
};
exports.uploadVideos = uploadVideos;
const deleteVideo = async (key) => {
    s3.deleteObject({
        Bucket: "uploadfileteste2",
        Key: key,
    })
        .promise()
        .then(() => {
        console.log("Enviado");
    })
        .catch((err) => { });
};
exports.deleteVideo = deleteVideo;
