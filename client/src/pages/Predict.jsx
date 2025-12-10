// src/pages/Predict.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Predict() {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [duration, setDuration] = useState("");
  const [durationUnit, setDurationUnit] = useState("days"); // days | weeks | months
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e && e.preventDefault();
    setError("");
    setResult(null);

    if (!symptoms.trim()) {
      setError("Please enter symptoms.");
      return;
    }
    if (age !== "" && (!Number.isFinite(Number(age)) || Number(age) <= 0)) {
      setError("Please enter a valid age (positive number).");
      return;
    }
    if (duration !== "" && (!Number.isFinite(Number(duration)) || Number(duration) <= 0)) {
      setError("Please enter a valid duration (positive number).");
      return;
    }

    setLoading(true);
    try {
      // Build query params. Keep old behaviour (GET).
      const params = new URLSearchParams();
      params.set("symptoms", symptoms.trim());
      if (age !== "") params.set("age", String(age));
      if (duration !== "") {
        params.set("duration", String(duration));
        params.set("duration_unit", durationUnit);
      }

      const url = "/predict-disease?" + params.toString();
      const res = await fetch(url);
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || d.message || "Prediction failed");
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  // Styles (inline so no external CSS dependency)
  const page = {
    minHeight: "100vh",
    background: "#173c61",
    paddingTop: 20,
    paddingBottom: 40,
    boxSizing: "border-box",
    color: "#111",
    fontFamily: "'Poppins', system-ui, -apple-system, Segoe UI, Roboto, Arial",
  };

  const nav = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 1100,
    margin: "0 auto",
    padding: "10px 16px",
    background: "#fff",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    boxSizing: "border-box",
  };

  const navLinks = { display: "flex", gap: 14, alignItems: "center" };
  const navLink = { color: "#1f2937", textDecoration: "none", fontSize: 14 };

  const container = { maxWidth: 900, margin: "36px auto 0", padding: "28px", boxSizing: "border-box" };
  const card = {
    background: "#fff",
    borderRadius: 6,
    padding: 28,
    boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
    textAlign: "center",
  };

  const title = { fontSize: 28, margin: "0 0 8px", color: "#143048", fontWeight: 700 };
  const subtitle = { margin: "0 0 22px", color: "#475569" };

  const input = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: 16,
    boxSizing: "border-box",
  };

  const smallInput = {
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: 15,
    boxSizing: "border-box",
    width: "100%",
  };

  const btn = {
    marginTop: 14,
    background: "#0b57b3",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 18px",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
  };

  const spinner = {
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "4px solid #e5e7eb",
    borderTopColor: "#0b57b3",
    margin: "20px auto",
    animation: "spin 1s linear infinite",
  };

  const resultBox = {
    marginTop: 18,
    textAlign: "left",
    background: "#f1f8ff",
    border: "1px solid #bfdbfe",
    color: "#0b3b66",
    padding: 16,
    borderRadius: 6,
  };

  const row = { display: "flex", gap: 12, alignItems: "center", marginTop: 12 };
  const col = { flex: 1, minWidth: 0 };

  return (
    <div style={page}>
      <nav style={nav}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link to="/home" style={{ display: "inline-block", textDecoration: "none" }}>
            <img src="/assets/img/gallery/ruralai.png" alt="logo" style={{ height: 34 }} />
          </Link>
        </div>

        <div style={navLinks}>
          <Link to="/profile/home" style={navLink}>Home</Link>
          <a href="#findUs" style={navLink}>Chatbot Assist</a>
          <Link to="/predict" style={navLink}>Find Blood Bank</Link>
          <Link to="/profile/doctorpage" style={navLink}>Consult Doctor</Link>
          <Link to="/profile/video" style={navLink}>Education</Link>
          <Link to="/profile" style={navLink}>Profile</Link>
          <a href="/auth/logout" style={{ ...navLink, border: "1px solid #0ea5b6", padding: "6px 8px", borderRadius: 999, color: "#0ea5b6" }}>Logout</a>
        </div>
      </nav>

      <div style={container}>
        <div style={card}>
          <h1 style={title}>Disease Prediction</h1>
          <p style={subtitle}>Enter your symptoms and basic info to get a prediction of possible diseases.</p>

          <form onSubmit={submit} style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ marginBottom: 12 }}>
              <input
                type="text"
                id="symptoms"
                name="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Enter your symptoms (separated by commas)"
                style={input}
                aria-label="Symptoms"
              />
            </div>

            <div style={row}>
              <div style={col}>
                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  id="age"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age (years)"
                  style={smallInput}
                  aria-label="Age"
                />
              </div>

              <div style={{ width: 140 }}>
                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  id="duration"
                  name="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Duration"
                  style={{ ...smallInput, marginBottom: 6 }}
                  aria-label="Duration value"
                />
                <select
                  value={durationUnit}
                  onChange={(e) => setDurationUnit(e.target.value)}
                  style={{ ...smallInput, marginTop: 6 }}
                  aria-label="Duration unit"
                >
                  <option value="days">days</option>
                  <option value="weeks">weeks</option>
                  <option value="months">months</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button type="submit" disabled={loading} style={btn}>
                {loading ? "Predicting..." : "Predict"}
              </button>
            </div>
          </form>

          {loading && <div style={spinner} aria-hidden="true" />}

          {error && !loading && <div style={{ marginTop: 16, color: "#b91c1c" }}>{error}</div>}

          {result && !loading && (
            <div style={resultBox}>
              <h3 style={{ margin: 0, marginBottom: 8, fontSize: 18 }}>Predicted Disease</h3>
              <div style={{ fontSize: 16 }}>{result.final_prediction ?? JSON.stringify(result)}</div>

              {result.svm_model_prediction && (
                <p style={{ marginTop: 10, marginBottom: 0, color: "#334155" }}>
                  <strong>SVM:</strong> {result.svm_model_prediction}
                </p>
              )}
              {result.naive_bayes_prediction && (
                <p style={{ marginTop: 6, marginBottom: 0, color: "#334155" }}>
                  <strong>Naive Bayes:</strong> {result.naive_bayes_prediction}
                </p>
              )}
              {result.rf_model_prediction && (
                <p style={{ marginTop: 6, marginBottom: 0, color: "#334155" }}>
                  <strong>Random Forest:</strong> {result.rf_model_prediction}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
