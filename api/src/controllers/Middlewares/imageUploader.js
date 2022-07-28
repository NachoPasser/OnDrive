const multer = require("multer");
const { uploader } = require("../../config/multer");

async function imageUploader(req, res, next) {
  try {
    uploader(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        let message = null;
        switch (err.code) {
          case "LIMIT_FILE_SIZE":
            message = "Tamaño de archivo excedido (max 1MB)";
            break;
          case "LIMIT_FILE_COUNT":
            message = "Solo puedes subir 1 archivo a la vez";
          case "LIMIT_FIELD_KEY":
            message = "Falta el campo para el archivo (image)";
          case "LIMIT_UNEXPECTED_FILE":
            message = "Error, archivo inesperado";
          default:
            message = err.message;
            break;
        }
        res.status(401).json({ error: message });
      } else if (err) res.status(400).json({ error: err.message });
      else next();
    });
  } catch (e) {
    res.status(500).json({ error: "Error interno" });
  }
}

module.exports = { imageUploader };
