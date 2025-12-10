// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message || "Login failed");
      }
      const data = await res.json();
      if (data.user) localStorage.setItem("myapp_user", JSON.stringify(data.user));
      if (data.token) localStorage.setItem("myapp_token", data.token);
      navigate("/profile");
    } catch (error) {
      setErr(error.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const heroImage = "/assets/img/gallery/log.jpg";

  // Inline style wrapper to prevent global CSS from shifting layout
  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px",
    backgroundColor: "#173c61",
    boxSizing: "border-box",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "920px",
    display: "flex",
    background: "#fff",
    boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
    overflow: "hidden",
  };

  const leftStyle = {
    width: "50%",
    padding: "44px",
    minHeight: "380px",
  };

  const rightStyle = {
    width: "50%",
    minHeight: "380px",
    backgroundImage: `url(${heroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle} role="region" aria-label="login-card">
        {/* LEFT */}
        <div style={leftStyle}>
          <h1 style={{ fontSize: 28, fontWeight: 600, color: "#222", marginBottom: 18, position: "relative", display: "inline-block" }}>
            Login
            <span style={{ position: "absolute", left: 0, bottom: -10, width: 36, height: 4, background: "#004fb0", borderRadius: 4 }} />
          </h1>

          {err && <div style={{ color: "#c53030", marginBottom: 10 }}>{err}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ position: "relative", marginBottom: 22 }}>
              <i className="fas fa-envelope" style={{ color: "#0b57b3", position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 36px",
                  border: "none",
                  borderBottom: "2px solid rgba(0,0,0,0.15)",
                  outline: "none",
                  fontSize: 16,
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = "#004fb0")}
                onBlur={(e) => (e.target.style.borderBottomColor = "rgba(0,0,0,0.15)")}
              />
            </div>

            <div style={{ position: "relative", marginBottom: 14 }}>
              <i className="fas fa-lock" style={{ color: "#0b57b3", position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 36px",
                  border: "none",
                  borderBottom: "2px solid rgba(0,0,0,0.15)",
                  outline: "none",
                  fontSize: 16,
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = "#004fb0")}
                onBlur={(e) => (e.target.style.borderBottomColor = "rgba(0,0,0,0.15)")}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <a href="#" style={{ color: "#2338ff", fontSize: 14 }}>Forgot password?</a>
            </div>

            <div style={{ marginTop: 16 }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  background: "#0b57b3",
                  color: "#fff",
                  padding: "12px",
                  borderRadius: 8,
                  border: "none",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {loading ? "Please wait..." : "Submit"}
              </button>
            </div>

            <div style={{ textAlign: "center", marginTop: 16, color: "#222", fontSize: 14 }}>
              Don't have an account?{" "}
              <Link to="/auth/signup" style={{ color: "#2338ff", fontWeight: 600 }}>
                Signup now
              </Link>
            </div>
          </form>
        </div>

        {/* RIGHT */}
        <div style={rightStyle}>
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(52,166,211,0.18)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <h2 style={{ fontSize: 28, letterSpacing: 10, fontWeight: 800, color: "rgba(0,0,0,0.85)" }}>Rural Health AI</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
