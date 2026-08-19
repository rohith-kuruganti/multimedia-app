import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="home-navbar">
        <div className="home-logo">
          <span>MediaHub</span>
        </div>

        <div className="home-actions">
          <button
            className="home-login-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="home-register-button"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </header>

      <main className="home-main">
        <section className="home-hero">
          <div className="home-hero-content">
            <p className="home-eyebrow">SIMPLE FILE MANAGEMENT</p>

            <h1>
              Store and manage
              <br />
              your files easily.
            </h1>

            <p className="home-description">
              Upload, search and preview your images, videos, audio files and
              documents from one simple dashboard.
            </p>

            <div className="home-hero-actions">
              <button
                className="home-primary-button"
                onClick={() => navigate("/register")}
              >
                Get Started
              </button>

              <button
                className="home-secondary-button"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </div>
          </div>

          <div className="home-preview-card">
            <div className="home-preview-header">
              <span>My Files</span>
              <span>MediaHub</span>
            </div>

            <div className="home-file-item">
              <div className="home-file-icon">IMG</div>

              <div>
                <strong>My Image.jpg</strong>
                <small>1.2 MB</small>
              </div>
            </div>

            <div className="home-file-item">
              <div className="home-file-icon">PDF</div>

              <div>
                <strong>Resume.pdf</strong>
                <small>850 KB</small>
              </div>
            </div>

            <div className="home-file-item">
              <div className="home-file-icon">MP4</div>

              <div>
                <strong>My Video.mp4</strong>
                <small>12 MB</small>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
