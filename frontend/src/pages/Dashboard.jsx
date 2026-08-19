import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import UploadForm from "../components/UploadForm";
import FileGrid from "../components/FileGrid";
import FilePreview from "../components/FilePreview";

import fileService from "../services/file.service";

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const loadFiles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fileService.getFiles();

      setFiles(response.files || []);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError("");
      setIsSearching(true);

      const response = await fileService.searchFiles(query);

      setFiles(response.files || []);
    } catch (error) {
      setError(error.response?.data?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = async () => {
    setIsSearching(false);

    await loadFiles();
  };

  const handleViewFile = async (fileId) => {
    try {
      setError("");

      const response = await fileService.getFileById(fileId);

      setSelectedFile(response.file);

      if (!isSearching) {
        await loadFiles();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to open file");
    }
  };

  const handleUploadSuccess = async () => {
    setIsSearching(false);

    await loadFiles();
  };

  return (
    <div className="dashboard">
      <Navbar />

      <main className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <h1>My Files</h1>
            <p>Upload, search and manage your files.</p>
          </div>
        </div>

        <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

        <UploadForm onUploadSuccess={handleUploadSuccess} />

        <section className="files-section">
          <h2>{isSearching ? "Search Results" : "My Files"}</h2>

          {loading && <p>Loading files...</p>}

          {error && <p>{error}</p>}

          {!loading && !error && (
            <FileGrid files={files} onView={handleViewFile} />
          )}
        </section>
      </main>

      <FilePreview file={selectedFile} onClose={() => setSelectedFile(null)} />
    </div>
  );
}

export default Dashboard;
