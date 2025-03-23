import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import SearchBar from "./SearchBar";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const { isAuthenticated, logout, getUser } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm position-relative">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          Socialy
        </Link>
        <div className="flex-grow-1 px-3 ">
          {isAuthenticated && <SearchBar />}
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <div className="d-flex align-items-center gap-2">
                {/* Render NotificationBell outside the collapse to avoid layout issues */}
                <div className="position-relative" style={{ zIndex: 1100 }}>
                  <NotificationBell userId={getUser().id} />
                </div>
                
                <li className="nav-item dropdown position-relative">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    role="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={
                        getUser().profileImage === " "
                          ? "https://placehold.co/150"
                          : "http://localhost:3000/uploads/" + getUser().profileImage
                      }
                      alt="profile"
                      className="rounded-circle me-2"
                      style={{
                        width: "35px",
                        height: "35px",
                        objectFit: "cover",
                      }}
                    />
                    <span>Account</span>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end shadow"
                    aria-labelledby="userDropdown"
                    style={{ zIndex: 1050 }}
                  >
                    <li>
                      <Link className="dropdown-item" to={`/profile/${getUser().id}`}>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/settings">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={logout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </div>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
