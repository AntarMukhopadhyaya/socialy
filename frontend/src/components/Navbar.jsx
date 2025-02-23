import React from "react";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Socialy
        </a>
        {isAuthenticated ? (
          <div className="d-flex">
            <div className="dropdown ">
              <a
                href=""
                className="d=flex align-items-center text-decoration-none dropdown-toggle"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://via.placeholder.com/150"
                  alt="profile"
                  className="rounded-circle"
                  style={{ width: "30px" }}
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end z-1"
                aria-labelledby="userDropDown"
              >
                <li>
                  <a className="dropdown-item" href="/profile">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/settings">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" onClick={logout}>Logout</a>
                </li>
              </ul>
            </div>
           
          </div>
        ) : (
          <a className="btn btn-primary" href="/login">
            Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
