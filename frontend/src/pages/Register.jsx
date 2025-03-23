import React, { useState } from "react";
import axios from "axios";
import Alert from "../components/Alert";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        formData
      );
      if (!response.data.message) {
        setErrorMessage("Something went wrong");
        return;
      }
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "An error occurred");
      setSuccessMessage("");
    } finally {
      setLoading(false);
      setFormData({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <main className="d-flex align-items-center justify-content-center min-vh-100 py-3">
      <div className="card shadow-lg p-4 mb-5 bg-white rounded" style={{ width: "30rem" }}>
        <div className="card-body">
          <h5 className="card-title mb-4 text-center">Create an Account</h5>
          {errorMessage && <Alert message={errorMessage} type="danger" onClose={() => setErrorMessage("")} />}
          {successMessage && <Alert message={successMessage} type="success" onClose={() => setSuccessMessage("")} />}

          <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
              <label>Email*</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your Email..."
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group my-3">
              <label>Username*</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Username..."
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>

            <div className="form-group my-3">
              <label>Password*</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your Password..."
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div className="form-group my-3">
              <label>Confirm Password*</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm your Password..."
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3" disabled={loading}>
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>
          <div className="text-center mt-3">
            Already have an account? <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
