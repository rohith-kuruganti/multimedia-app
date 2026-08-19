import { useState } from "react";

import fileService from "../services/file.service";

function UploadForm({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    setSelectedFiles(files);
    setUploadStatus({});
    setError("");
    setSuccess("");
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) {
      setError("Please select at least one file");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    let successCount = 0;
    let failedCount = 0;

    for (const file of selectedFiles) {
      setUploadStatus((previous) => ({
        ...previous,
        [file.name]: {
          status: "uploading",
          progress: 0,
        },
      }));

      try {
        await fileService.uploadFile(file, (progress) => {
          setUploadStatus((previous) => ({
            ...previous,
            [file.name]: {
              status: "uploading",
              progress,
            },
          }));
        });

        setUploadStatus((previous) => ({
          ...previous,
          [file.name]: {
            status: "uploaded",
            progress: 100,
          },
        }));

        successCount++;
      } catch (error) {
        setUploadStatus((previous) => ({
          ...previous,
          [file.name]: {
            status: "failed",
            progress: 0,
          },
        }));

        failedCount++;
      }
    }

    setLoading(false);

    if (successCount > 0) {
      onUploadSuccess();
    }

    if (failedCount === 0) {
      setSuccess(`${successCount} file(s) uploaded successfully`);
    } else {
      setSuccess(`${successCount} uploaded, ${failedCount} failed`);
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

          <ul className="upload-file-list">
            {selectedFiles.map((file, index) => {
              const status = uploadStatus[file.name];

              return (
                <li key={`${file.name}-${index}`}>
                  {file.name}

                  {status?.status === "uploading" && (
                    <div>
                      <span>Uploading... {status.progress}%</span>

                      <progress value={status.progress} max="100" />
                    </div>
                  )}

                  {status === "uploaded" && <span> — Uploaded ✓</span>}

                  {status === "failed" && <span> — Failed ✕</span>}
                </li>
              );
            })}
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
