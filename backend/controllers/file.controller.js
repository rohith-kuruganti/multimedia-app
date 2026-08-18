const cloudinary = require("../config/cloudinary");
const File = require("../models/file.model");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(req.file.buffer);
    });

    const file = await File.create({
      user: req.user.userId,
      originalName: req.file.originalname,
      cloudinaryUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      fileType: getFileType(req.file.mimetype),
      mimeType: req.file.mimetype,
      size: req.file.size,
    });

    return res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      file: {
        id: file._id,
        originalName: file.originalName,
        cloudinaryUrl: file.cloudinaryUrl,
        fileType: file.fileType,
        mimeType: file.mimeType,
        size: file.size,
        viewCount: file.viewCount,
        createdAt: file.createdAt,
      },
    });
  } catch (error) {
    console.error("File upload error:", error);

    return res.status(500).json({
      success: false,
      message: "File upload failed",
    });
  }
};

const getFileType = (mimeType) => {
  if (mimeType.startsWith("image/")) {
    return "image";
  }

  if (mimeType.startsWith("video/")) {
    return "video";
  }

  if (mimeType.startsWith("audio/")) {
    return "audio";
  }

  if (mimeType === "application/pdf") {
    return "pdf";
  }

  return "unknown";
};

const getFiles = async (req, res) => {
  try {
    const files = await File.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: files.length,
      files,
    });
  } catch (error) {
    console.error("Get files error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve files",
    });
  }
};

const getFileById = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await File.findOneAndUpdate(
      {
        _id: id,
        user: req.user.userId,
      },
      {
        $inc: {
          viewCount: 1,
        },
      },
      {
        new: true,
      }
    );

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    return res.status(200).json({
      success: true,
      file,
    });
  } catch (error) {
    console.error("Get file error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve file",
    });
  }
};

module.exports = {
  uploadFile,
  getFiles,
  getFileById,
};
