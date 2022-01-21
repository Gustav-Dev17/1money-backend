"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePhoto = exports.uploadPhotoProfile = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3();
const uploadPhotoProfile = async (buffer, photo) => {
    const awsUpload = await s3
        .upload({
        Bucket: "uploadfileteste2",
        Key: `${Date.now()}-${photo.originalname}`,
        Body: buffer,
        ACL: "public-read",
        ContentType: "image/jpg image/png",
    }, (err) => {
        if (err) {
            console.log("Error", err);
        }
    })
        .promise();
    return awsUpload;
};
exports.uploadPhotoProfile = uploadPhotoProfile;
const deletePhoto = async (key) => {
    s3.deleteObject({
        Bucket: "uploadfileteste2",
        Key: key,
    })
        .promise()
        .then(() => { })
        .catch((err) => { });
};
exports.deletePhoto = deletePhoto;
