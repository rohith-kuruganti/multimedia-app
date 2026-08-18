const express = require("express");

const authenticate = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const { uploadFile } = require("../controllers/file.controller");

const router = express.Router();

router.post("/upload", authenticate, upload.single("file"), uploadFile);

module.exports = router;
