import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate, Link } from "react-router-dom";

function FirebaseRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) navigate("/chat");
    });
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential.user);
      navigate("/chat");
    } catch (error) {
      console.error("Error registering user:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card shadow-lg p-4 rounded">
        <h2 className="text-center mb-4 fw-bold text-primary">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 mt-3 animated-btn">
            Register
          </button>
        </form>

        <div className="mt-3 text-center">
          <p className="text-muted small">
            Already have an account?{" "}
            <Link to="/login" className="text-primary fw-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FirebaseRegister;
