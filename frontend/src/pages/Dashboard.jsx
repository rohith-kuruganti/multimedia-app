import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import UploadForm from "../components/UploadForm";
import FileGrid from "../components/FileGrid";
import fileService from "../services/file.service";

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div>
      <Navbar />

      <main>
        <h1>My Files</h1>

        <UploadForm />

        <section>
          <h2>Files</h2>

          {loading && <p>Loading files...</p>}

          {error && <p>{error}</p>}

          {!loading && !error && <FileGrid files={files} />}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
