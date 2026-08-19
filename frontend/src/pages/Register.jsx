import { useState } from "react";
import { useNavigate } from "react-router-dom";

import authService from "../services/auth.service";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Name, email and password are required");

      return;
    }

    try {
      setLoading(true);

      await authService.register(formData);

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="back-home-button" onClick={() => navigate("/")}>
        ← Home
      </button>
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>

          <input name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>
      </form>

      <button onClick={() => navigate("/login")}>
        Already have an account? Login
      </button>
    </div>
  );
}

export default Register;
