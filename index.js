const visitLogger = require("./middlewares/visitLogger");
const express = require("express");
const path = require("path");
require("dotenv").config();

const mainRouter = require("./routes");
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(visitLogger);
app.use(express.static(path.join(__dirname, "public")));
app.use("/", mainRouter);

sequelize.authenticate()
  .then(() => {
    console.log("Conexión a la base de datos exitosa");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("Modelos sincronizados correctamente");
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar o sincronizar la base de datos:", error);
  });