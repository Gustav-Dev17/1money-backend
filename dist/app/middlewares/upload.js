"use strict";
const multer = require("multer");
module.exports = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        const isAccepted = ["video/mp4"].find((formatoAceito) => formatoAceito == file.mimetype);
        if (isAccepted) {
            return cb(null, true);
        }
        return cb(null, false);
    },
});
