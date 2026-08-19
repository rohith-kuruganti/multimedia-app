function FileCard({ file, onView }) {
  const getFileIcon = () => {
    if (file.fileType === "image") return "🖼️";
    if (file.fileType === "video") return "🎥";
    if (file.fileType === "audio") return "🎵";
    if (file.fileType === "pdf") return "📄";

    return "📁";
  };

  const formatSize = (bytes) => {
    if (!bytes) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB"];

    const index = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, index)).toFixed(1)} ${units[index]}`;
  };

  return (
    <article className="file-card">
      <div className="file-icon">{getFileIcon()}</div>

      <h3 title={file.originalName}>{file.originalName}</h3>

      <p>{formatSize(file.size)}</p>

      <p>Views: {file.viewCount || 0}</p>

      <button onClick={() => onView(file._id)}>View</button>
    </article>
  );
}

export default FileCard;
