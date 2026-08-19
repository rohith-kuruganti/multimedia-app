import { useState } from "react";

import fileService from "../services/file.service";

function UploadForm({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file || null);
    setError("");
    setSuccess("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file");

      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await fileService.uploadFile(selectedFile);

      setSuccess("File uploaded successfully");

      setSelectedFile(null);

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

      <input type="file" onChange={handleFileChange} disabled={loading} />

      {selectedFile && <p>Selected: {selectedFile.name}</p>}

      <button type="button" onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {error && <p>{error}</p>}

      {success && <p>{success}</p>}
    </section>
  );
}

export default UploadForm;
