const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    return res.status(200).json({
      success: true,
      message: "File received successfully",
      file: {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
      },
    });
  } catch (error) {
    console.error("File upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  uploadFile,
};
