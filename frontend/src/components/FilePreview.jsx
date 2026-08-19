function FilePreview({ file, onClose }) {
  if (!file) {
    return null;
  }

  const isImage = file.fileType === "image";

  const isVideo = file.fileType === "video";

  const isAudio = file.fileType === "audio";

  const isPdf = file.fileType === "pdf";

  const isPreviewable = isImage || isVideo || isAudio || isPdf;

  return (
    <div className="preview-overlay">
      <div className="preview-modal">
        <button onClick={onClose}>Close</button>

        <h2>{file.originalName}</h2>

        {isImage && (
          <img
            src={file.cloudinaryUrl}
            alt={file.originalName}
            className="preview-media"
          />
        )}

        {isVideo && (
          <video src={file.cloudinaryUrl} controls className="preview-media" />
        )}

        {isAudio && <audio src={file.cloudinaryUrl} controls />}

        {isPdf && (
          <iframe
            src={file.cloudinaryUrl}
            title={file.originalName}
            width="100%"
            height="600"
          />
        )}

        {!isPreviewable && (
          <a href={file.cloudinaryUrl} target="_blank" rel="noreferrer">
            Open / Download File
          </a>
        )}
      </div>
    </div>
  );
}

export default FilePreview;
