const multer = require("multer");
import path from "path";
import crypto from "crypto";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        file.key = `${hash.toString("hex")}-${file.originalname}`;
        cb(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: "uploadfileteste2",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        const filename = `${hash.toString("hex")}-${file.originalname}`;
        cb(null, filename);
      });
    },
  }),
};

export = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes["s3"],
  fileFilter: (req, file, cb) => {
    const allowedMines = ["video/mp4"];
    if (allowedMines.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
};
