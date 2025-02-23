import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };
  const getUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded;
    }
    return null;
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.reload();
  };
  return { isAuthenticated, login, logout,getUser };
};
export default useAuth;
