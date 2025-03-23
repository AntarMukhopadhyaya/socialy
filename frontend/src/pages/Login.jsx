import React, { useState } from "react";
import Alert from "../components/Alert";
import { useNavigate } from "react-router";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        formData
      );
      if (!response.data.token) {
        setErrorMessage(response.data.message);
        return;
      }
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <main className=" d-flex align-items-center justify-content-center min-vh-100 py-3 ">
      <div
        className="card shadow-lg p-3 mb-5 bg-white rounded"
        style={{ width: "30rem" }}
      >
        <Alert message={errorMessage} type="danger" onClose={() => setErrorMessage("")} />
        <Alert message={successMessage} type="success" onClose={() => setSuccessMessage("")} />
        <div className="card-header">
          <h5 className="card-title">Login to your Account</h5>
        </div>
        <div className="card-body ">
          <form onSubmit={handleSubmit}>
            <div className="form-group my-2">
              <label className="form-label" htmlFor="email">
                Email*
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter your Email..."
                required
                value = {formData.email}
                onChange = {(e) => setFormData({...formData,email:e.target.value})}
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
                value = {formData.password}
                onChange = {(e) => setFormData({...formData,password:e.target.value})}
              />
            </div>

            <button className="btn btn-outline-primary btn-lg" type="submit" disabled={loading}>{loading ? "Loading" : "Login"}</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
