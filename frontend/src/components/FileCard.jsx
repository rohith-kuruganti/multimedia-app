function FileCard({ file, onView }) {
  return (
    <article>
      <h3>{file.originalName}</h3>

      <p>Type: {file.fileType}</p>

      <p>Size: {file.size} bytes</p>

      <p>Views: {file.viewCount}</p>

      {file.relevanceScore !== undefined && (
        <p>Relevance: {file.relevanceScore}</p>
      )}

      <p>Uploaded: {new Date(file.createdAt).toLocaleDateString()}</p>

      <button onClick={() => onView(file._id)}>View</button>
    </article>
  );
}

export default FileCard;
