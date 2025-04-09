const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dirName = "./public/uploads";
        fs.mkdir(dirName, { recursive: true }, (err) => {
            if (err) {
                return cb(err);
            }
            cb(null, dirName);
        });
    },

    filename: function (req, file, cb) {
        crypto.randomBytes(16, (err, bytes) => {
            const fn = bytes.toString("hex") + path.extname(file.originalname);
            cb(null, fn);
        });
    },
});

exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024,
    },
});
