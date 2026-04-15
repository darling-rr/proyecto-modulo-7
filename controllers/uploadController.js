exports.uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "No se recibió ningún archivo",
        data: null
      });
    }

    res.status(201).json({
      status: "success",
      message: "Archivo subido correctamente",
      data: {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
        mimetype: req.file.mimetype,
        size: req.file.size
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al subir archivo",
      data: error.message
    });
  }
};
