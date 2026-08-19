function FileCard({ file }) {
  return (
    <article>
      <div>
        <strong>{file.originalName}</strong>
      </div>

      <p>Type: {file.fileType}</p>

      <p>Views: {file.viewCount}</p>

      <button>View</button>
    </article>
  );
}

export default FileCard;
