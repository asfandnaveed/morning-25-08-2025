import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";

function FirebaseLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {

      if (user) {
        navigate('/chat')
      }
    });

  }, []);




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = await signInWithEmailAndPassword(auth, email, password);

      console.log(data.user);

    } catch (e) {
      console.log('Error : ' + e);
    }


    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card shadow-lg p-4 rounded">
        <h2 className="text-center mb-4 fw-bold text-primary">Admin Login</h2>
        <form onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="btn btn-primary w-100 mt-3 animated-btn"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center small text-muted">
          © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}

export default FirebaseLogin;
