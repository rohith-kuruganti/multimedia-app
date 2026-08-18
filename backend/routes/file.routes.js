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
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

/**
 * @swagger
 * /api/files/upload:
 *   post:
 *     summary: Upload a multimedia file
 *     tags:
 *       - Files
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *       400:
 *         description: Invalid file or file too large
 *       401:
 *         description: Authentication required
 */
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
  asyncHandler(uploadFile)
);

/**
 * @swagger
 * /api/files:
 *   get:
 *     summary: Get files uploaded by the authenticated user
 *     tags:
 *       - Files
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of files
 *       401:
 *         description: Authentication required
 */
router.get("/", authenticate, asyncHandler(getFiles));

/**
 * @swagger
 * /api/files/search:
 *   get:
 *     summary: Search and rank files
 *     tags:
 *       - Files
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Keyword to search in filename and tags
 *         example: resume
 *     responses:
 *       200:
 *         description: Ranked search results
 *       400:
 *         description: Search query is required
 *       401:
 *         description: Authentication required
 */
router.get("/search", authenticate, asyncHandler(searchFiles));

/**
 * @swagger
 * /api/files/{id}:
 *   get:
 *     summary: Get a file by ID
 *     tags:
 *       - Files
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB file ID
 *     responses:
 *       200:
 *         description: File details
 *       400:
 *         description: Invalid file ID
 *       401:
 *         description: Authentication required
 *       404:
 *         description: File not found
 */
router.get("/:id", authenticate, asyncHandler(getFileById));
module.exports = router;
