// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    mobile: "",
    email: "",     // <-- updated
    address: "",
    bloodgroup: "",
    password: "",
  });

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await fetch("/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // sending email now
      });

      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message || "Signup failed");
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

  // Styling preserved from your version
  const heroImage = "/assets/img/gallery/log.jpg";

  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "28px",
    backgroundColor: "#173c61",
    boxSizing: "border-box",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: 980,
    display: "flex",
    background: "#fff",
    boxShadow: "0 18px 45px rgba(0,0,0,0.28)",
    overflow: "hidden",
    borderRadius: 6,
    flexWrap: "wrap",
  };

  const leftStyle = {
    flex: "1 1 420px",
    padding: "44px",
    minWidth: 320,
    boxSizing: "border-box",
  };

  const rightStyle = {
    flex: "1 1 320px",
    minWidth: 280,
    minHeight: 260,
    backgroundImage: `url(${heroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  };

  const inputBase = {
    width: "100%",
    padding: "12px 12px 12px 40px",
    border: "none",
    borderBottom: "2px solid rgba(0,0,0,0.15)",
    outline: "none",
    fontSize: 16,
    background: "transparent",
  };

  const iconStyle = {
    color: "#0b57b3",
    position: "absolute",
    left: 8,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 14,
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle} role="region" aria-label="signup-card">
        
        {/* LEFT FORM */}
        <div style={leftStyle}>
          <h1 style={{ fontSize: 28, fontWeight: 600, color: "#222", marginBottom: 18, position: "relative", display: "inline-block" }}>
            Signup
            <span style={{ position: "absolute", left: 0, bottom: -10, width: 36, height: 4, background: "#004fb0", borderRadius: 4 }} />
          </h1>

          {err && <div style={{ color: "#c53030", marginBottom: 12 }}>{err}</div>}

          <form onSubmit={handleSubmit} noValidate>

            {/* Name */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <i className="fas fa-user" style={iconStyle} />
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                required
                value={form.name}
                onChange={handleChange}
                style={inputBase}
              />
            </div>

            {/* Age */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <i className="fas fa-id-card" style={iconStyle} />
              <input
                name="age"
                type="number"
                placeholder="Enter your Age"
                required
                value={form.age}
                onChange={handleChange}
                style={inputBase}
              />
            </div>

            {/* Mobile */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <i className="fas fa-phone" style={iconStyle} />
              <input
                name="mobile"
                type="tel"
                placeholder="Enter your Mobile Number"
                required
                value={form.mobile}
                onChange={handleChange}
                style={inputBase}
              />
            </div>

            {/* EMAIL (replaces username) */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <i className="fas fa-envelope" style={iconStyle} />
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                value={form.email}
                onChange={handleChange}
                style={inputBase}
              />
            </div>

            {/* Address */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <i className="fas fa-map-marker-alt" style={iconStyle} />
              <input
                name="address"
                type="text"
                placeholder="Enter your Address"
                required
                value={form.address}
                onChange={handleChange}
                style={inputBase}
              />
            </div>

            {/* Blood Group */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <i className="fas fa-tint" style={iconStyle} />
              <input
                name="bloodgroup"
                type="text"
                placeholder="Enter your Blood Group"
                required
                value={form.bloodgroup}
                onChange={handleChange}
                style={inputBase}
              />
            </div>

            {/* Password */}
            <div style={{ position: "relative", marginBottom: 18 }}>
              <i className="fas fa-lock" style={iconStyle} />
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                value={form.password}
                onChange={handleChange}
                style={inputBase}
              />
            </div>

            {/* Submit */}
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

            <div style={{ textAlign: "center", marginTop: 14, fontSize: 14 }}>
              Already have an account?{" "}
              <Link to="/auth/login" style={{ color: "#2338ff", fontWeight: 600 }}>
                Login now
              </Link>
            </div>
          </form>
        </div>

        {/* RIGHT HERO IMAGE */}
        <div style={rightStyle}>
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(52,166,211,0.18)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <h2 style={{ fontSize: 28, letterSpacing: 10, fontWeight: 800 }}>Rural Health AI</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
