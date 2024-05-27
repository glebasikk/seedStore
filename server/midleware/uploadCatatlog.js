const multer = require("multer");
const fs = require("fs");
const config = require("../config")


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${config.path}uploads/`,);
  },
  filename: (req, file, cb) => {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage});
module.exports = uploadFile;