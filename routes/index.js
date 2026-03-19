const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const statusController = require("../controllers/statusController");

router.get("/", homeController.index);
router.get("/status", statusController.status);

module.exports = router;
