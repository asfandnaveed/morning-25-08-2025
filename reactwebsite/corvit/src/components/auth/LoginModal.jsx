import React, { useState } from "react";

const LoginModal = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:5002/api/user/user-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pass }),
      });

      const data = await res.json();
      if (data.status) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.reload(); // reload to refresh navbar state
      } else {
        setErrorMsg("Invalid credentials");
      }
    } catch (error) {
      setErrorMsg("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop-custom">
      <div className="login-modal card p-4 shadow-lg">
        <button
          className="btn-close position-absolute top-0 end-0 m-3"
          onClick={closeModal}
        ></button>

        <h3 className="text-center mb-4 fw-bold gradient-text">Login</h3>

        {errorMsg && (
          <div className="alert alert-danger py-2 text-center">{errorMsg}</div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control rounded-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-3"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-buy-now w-100 py-2 rounded-pill fw-semibold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
