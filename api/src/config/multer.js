const multer = require("multer");
const path = require("path");

const uploader = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    console.log(req)
    let extension = path.extname(file.originalname);
    const validExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    if (!validExtensions.includes(extension)) {
      cb(
        new Error("Extension invalida, soportamos: .jpeg, .jpg, .png, .webp"),
        false
      );
      return;
    }
    //valid extension
    cb(null, true);
  },
});

module.exports = { uploader: uploader.single("image")};
