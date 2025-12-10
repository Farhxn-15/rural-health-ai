import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Predict from "./pages/Predict";

function App() {
  return (
    <>
      {/* All App Routes */}
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Auth Pages */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        {/* User Pages */}
        <Route path="/profile" element={<Profile />} />

        {/* Prediction Page */}
        <Route path="/predict" element={<Predict />} />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#173c61",
                color: "white",
                fontSize: "28px",
              }}
            >
              404 — Page Not Found
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
