const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "../logs/log.txt");

const visitLogger = (req, res, next) => {
  const now = new Date();

  const fecha = now.toLocaleDateString();
  const hora = now.toLocaleTimeString();
  const ruta = req.originalUrl;

  const logLine = `Fecha: ${fecha} | Hora: ${hora} | Ruta: ${ruta}\n`;

  fs.appendFile(logPath, logLine, (err) => {
    if (err) {
      console.error("Error al escribir en log.txt:", err);
    }
  });

  next();
};

module.exports = visitLogger;