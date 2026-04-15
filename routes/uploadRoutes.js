const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const uploadController = require("../controllers/uploadController");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/upload", verifyToken, upload.single("file"), uploadController.uploadFile);

module.exports = router;
