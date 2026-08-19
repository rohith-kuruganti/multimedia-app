import FileCard from "./FileCard";

function FileGrid({ files, onView }) {
  if (!files.length) {
    return <p>No files found.</p>;
  }

  return (
    <div>
      {files.map((file) => (
        <FileCard key={file._id} file={file} onView={onView} />
      ))}
    </div>
  );
}

export default FileGrid;
