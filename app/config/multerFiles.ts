const multer = require("multer");
export = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const isAccepted = [
      "video/mp4",
      "image/png",
      "image/jpg",
      "image/jpeg",
    ].find((formatoAceito) => formatoAceito == file.mimetype);
    if (isAccepted) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});
