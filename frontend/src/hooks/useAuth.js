import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const useAuth = () => {
  const token = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!token); // Check if the token exists

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const getUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded;
      } catch (error) {
        console.error("Invalid token:", error.message);
        return null;
      }
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.reload(); // This forces a full reload ensuring the state updates everywhere
  };

  return { isAuthenticated, login, logout, getUser };
};

export default useAuth;
