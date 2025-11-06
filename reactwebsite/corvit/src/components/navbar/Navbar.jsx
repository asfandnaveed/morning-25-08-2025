import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginModal from "../auth/LoginModal";

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
        <div className="container-fluid px-4">
          <Link className="navbar-brand" to="/">
            MyStore
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto">
              <Link className="nav-link active" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/about">
                About
              </Link>
              <Link className="nav-link" to="/product">
                Products
              </Link>
            </div>

            <div className="d-flex align-items-center gap-3">
              {!user ? (
                <button
                  className="btn btn-login px-4 py-2 rounded-pill"
                  onClick={() => setShowModal(true)}
                >
                  Login
                </button>
              ) : (
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="profile-circle"
                    title={user.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "linear-gradient(to right, #d69555, #e3b281)",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <button
                    className="btn btn-outline-dark rounded-pill px-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showModal && <LoginModal closeModal={() => setShowModal(false)} />}
    </>
  );
}

export default Navbar;
