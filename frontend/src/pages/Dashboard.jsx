import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import UploadForm from "../components/UploadForm";
import FileGrid from "../components/FileGrid";
import fileService from "../services/file.service";
import SearchBar from "../components/SearchBar";

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const loadFiles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fileService.getFiles();

      setFiles(response.files);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load files");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError("");
      setIsSearching(true);

      const response = await fileService.searchFiles(query);

      setFiles(response.files);
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

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div>
      <Navbar />

      <main>
        <h1>My Files</h1>

        <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

        <UploadForm onUploadSuccess={loadFiles} />

        <section>
          <h2>{isSearching ? "Search Results" : "Files"}</h2>

          {loading && <p>Loading files...</p>}

          {error && <p>{error}</p>}

          {!loading && !error && <FileGrid files={files} />}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
