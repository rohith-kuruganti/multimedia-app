import { useState } from "react";

import fileService from "../services/file.service";

function UploadForm({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    setSelectedFiles(files);
    setError("");
    setSuccess("");
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) {
      setError("Please select at least one file");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      for (const file of selectedFiles) {
        await fileService.uploadFile(file);
      }

      setSuccess(`${selectedFiles.length} file(s) uploaded successfully`);

      setSelectedFiles([]);

      onUploadSuccess();
    } catch (error) {
      setError(error.response?.data?.message || "File upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Upload Files</h2>

      <input
        type="file"
        multiple
        onChange={handleFileChange}
        disabled={loading}
      />

      {selectedFiles.length > 0 && (
        <div>
          <h3>Selected Files</h3>

          <ul>
            {selectedFiles.map((file, index) => (
              <li key={`${file.name}-${index}`}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button type="button" onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {error && <p>{error}</p>}

      {success && <p>{success}</p>}
    </section>
  );
}

export default UploadForm;
