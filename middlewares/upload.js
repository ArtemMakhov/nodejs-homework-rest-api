const path = require("path");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "tmp"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
    storage: storage,
    fileFilter,
});

module.exports = {
    upload,
};