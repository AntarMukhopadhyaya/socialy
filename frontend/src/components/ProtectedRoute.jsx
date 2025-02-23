import { Navigate } from "react-router";

import { jwtDecode } from "jwt-decode";

import api from "../api";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  useEffect(() => {
    checkAuth().catch(() => setIsAuthorized(false));
  });

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;
    if (tokenExpiration < now) {
      setIsAuthorized(false);
      return;
    } else {
      setIsAuthorized(true);
    }
  };
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }
  return isAuthorized ? children : <Navigate to="/login" />;
};
export default ProtectedRoute;
