const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const statusController = require("../controllers/statusController");
const visitLogger = require("../middlewares/visitLogger");

// Ruta pública principal en HTML
router.get("/", visitLogger, homeController.index);

// Ruta pública de estado en JSON
router.get("/status", visitLogger, statusController.status);

module.exports = router;