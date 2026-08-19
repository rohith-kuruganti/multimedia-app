import Navbar from "../components/Navbar";
import UploadForm from "../components/UploadForm";
import FileGrid from "../components/FileGrid";

function Dashboard() {
  const files = [];

  return (
    <div>
      <Navbar />

      <main>
        <h1>My Files</h1>

        <UploadForm />

        <section>
          <h2>Files</h2>

          <FileGrid files={files} />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
