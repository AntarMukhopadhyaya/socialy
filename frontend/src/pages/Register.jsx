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
      return alert("Passwords do not match");
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        formData
      );
      if (!response.ok) {
        setErrorMessage("Something went wrong");
      }
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      window.location.href = "/login";
      console.log(response.data);
    } catch (err) {
      setErrorMessage(err.message);
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
    <main className=" d-flex align-items-center justify-content-center min-vh-100 py-3">
      <div
        className="card shadow-lg p-3 mb-5 bg-white rounded"
        style={{ width: "30rem" }}
      >
        <Alert
          message={errorMessage}
          type="danger"
          onClose={() => setErrorMessage("")}
        />
        <Alert
          message={successMessage}
          type="success"
          onClose={() => setSuccessMessage("")}
        />
        <div className="card-header">
          <h5 className="card-title">Register to your Account</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group my-2">
              <label className="form-label" htmlFor="email">
                Email*
              </label>
              <input
                className="form-control form-control-lg"
                placeholder="Enter your Email..."
                required
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="form-group my-2">
              <label className="form-label" htmlFor="username">
                Username*
              </label>
              <input
                className="form-control form-control-lg"
                placeholder="Enter your Username..."
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div className="form-group my-2">
              <label className="form-label" htmlFor="password">
                Password*
              </label>
              <input
                className="form-control form-control-lg"
                type="password"
                placeholder="Enter your Password..."
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className="form-group my-2">
              <label className="form-label" htmlFor="confirmPassword">
                Confirm Password*
              </label>
              <input
                className="form-control form-control-lg"
                type="password"
                placeholder="Confirm your Password..."
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>
            <button type="submit" className={`btn btn-outline-primary btn-lg`} disabled={loading}>
              {loading ? "Loading" : "Register"}
            </button>
          </form>
        </div>
        <div className="card-footer">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
