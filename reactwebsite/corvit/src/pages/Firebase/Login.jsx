import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate, Link } from "react-router-dom";

function FirebaseLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/chat");
    });
    return () => unsubscribe();
  }, [navigate]);

  // ✅ Simple validation
  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ✅ Login handler
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      navigate("/chat");
    } catch (error) {
      console.error("Login error:", error.message);
      if (error.code === "auth/invalid-credential") {
        alert("Incorrect email or password");
      } else if (error.code === "auth/user-not-found") {
        alert("User not found");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card shadow-lg p-4 rounded">
        <h2 className="text-center mb-4 fw-bold text-primary">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="form-group mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3 animated-btn">
            Login
          </button>
        </form>

        <div className="mt-3 text-center">
          <p className="text-muted small">
            Don’t have an account?{" "}
            <Link to="/register" className="text-success fw-semibold">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FirebaseLogin;
