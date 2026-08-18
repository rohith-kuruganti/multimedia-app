const express = require("express");
const multer = require("multer");

const authenticate = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const {
  uploadFile,
  getFiles,
  getFileById,
  searchFiles,
} = require("../controllers/file.controller");

const router = express.Router();

router.post(
  "/upload",
  authenticate,
  (req, res, next) => {
    upload.single("file")(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: "File size cannot exceed 50 MB",
          });
        }

        return res.status(400).json({
          success: false,
          message: "File upload validation failed",
        });
      }

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      next();
    });
  },
  uploadFile
);
router.get("/", authenticate, getFiles);
router.get("/search", authenticate, searchFiles);
router.get("/:id", authenticate, getFileById);

module.exports = router;
