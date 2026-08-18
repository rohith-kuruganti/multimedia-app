import api from "./services/api";

function App() {
  const testApi = async () => {
    try {
      const response = await api.get("/health");

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Multimedia Upload & Search</h1>

      <button onClick={testApi}>Test Backend</button>
    </div>
  );
}

export default App;
