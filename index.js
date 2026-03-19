// Importa express para crear el servidor
const express = require("express");

// Importa path para manejar rutas de archivos
const path = require("path");

// Importa dotenv para leer variables de entorno desde .env
require("dotenv").config();

// Importa el router principal
const mainRouter = require("./routes");

// Crea la aplicación Express
const app = express();

// Define el puerto usando variable de entorno o 3000 por defecto
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON en requests
app.use(express.json());

// Middleware para interpretar datos de formularios
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Usa las rutas principales
app.use("/", mainRouter);

// Levanta el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
