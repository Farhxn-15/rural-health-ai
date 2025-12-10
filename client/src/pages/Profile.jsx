// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // load user from localStorage (set by login/signup)
    try {
      const raw = localStorage.getItem("myapp_user");
      if (!raw) {
        navigate("/auth/login");
        return;
      }
      const parsed = JSON.parse(raw);
      setUser(parsed);
    } catch (err) {
      console.error("Failed to parse user", err);
      navigate("/auth/login");
    }
  }, [navigate]);

  const handleEdit = () => {
    // push to an edit page (implement separately)
    navigate("/profile/edit");
  };

  // while loading user
  if (!user) {
    return null; // or a spinner
  }

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* Top navigation */}
      <nav className="bg-white shadow fixed w-full z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/profile/home" className="flex items-center">
                <img src="/assets/img/gallery/ruralai.png" alt="logo" className="h-10 w-auto" />
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <Link to="/profile/home" className="text-sm text-slate-700 hover:text-slate-900">Home</Link>
              <a href="#findUs" className="text-sm text-slate-700 hover:text-slate-900">Chatbot Assist</a>
              <Link to="/predict" className="text-sm text-slate-700 hover:text-slate-900">Predict Ai</Link>
              <Link to="/profile/doctorpage" className="text-sm text-slate-700 hover:text-slate-900">Consult Doctor</Link>
              <Link to="/profile/video" className="text-sm text-slate-700 hover:text-slate-900">Education</Link>
              <Link to="/profile" className="text-sm text-slate-700 hover:text-slate-900">Profile</Link>
              <a href="/auth/logout" className="inline-block px-3 py-1.5 border border-sky-600 text-sky-600 rounded-full text-sm">Logout</a>
            </div>

            {/* mobile toggle */}
            <div className="md:hidden">
              <Link to="/auth/logout" className="inline-block px-2 py-1 text-sm text-sky-600">Logout</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero / header */}
      <header className="pt-20 pb-8">
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 rounded-md"
          style={{
            backgroundImage: `url('/assets/img/gallery/hero-bg.png')`,
            backgroundPosition: "top center",
            backgroundSize: "cover",
            opacity: 0.98,
          }}
        >
          <div className="bg-sky-900/90 rounded-md py-8 text-center">
            <h1 className="text-3xl font-semibold text-white">DASHBOARD</h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-md shadow p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold">Hey!! {user.name}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div className="space-y-3 py-4">
              <div className="text-sm text-slate-500">Name</div>
              <div className="text-lg font-medium text-slate-800">{user.name}</div>

              <div className="text-sm text-slate-500 mt-4">Address</div>
              <div className="text-lg font-medium text-slate-800">{user.address}</div>

              <div className="text-sm text-slate-500 mt-4">Phone</div>
              <div className="text-lg font-medium text-slate-800">{user.mobile}</div>
            </div>

            <div className="space-y-3 py-4">
              <div className="text-sm text-slate-500">Age</div>
              <div className="text-lg font-medium text-slate-800">{user.age}</div>

              <div className="text-sm text-slate-500 mt-4">Username</div>
              <div className="text-lg font-medium text-slate-800">{user.username}</div>

              <div className="text-sm text-slate-500 mt-4">Blood group</div>
              <div className="text-lg font-medium text-slate-800">{user.bloodgroup || "-"}</div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleEdit}
              className="inline-block px-5 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition"
            >
              Edit
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12">
        <div className="bg-slate-900 text-white mt-8">
          <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <img src="/assets/img/gallery/ruralai_ft.png" alt="logo" className="h-16 mb-4" />
              <p className="text-slate-300">The most advanced<br />Health Ai.</p>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Departments</h5>
              <ul className="text-slate-300 space-y-2">
                <li><a className="hover:underline" href="#!">Eye care</a></li>
                <li><a className="hover:underline" href="#!">Cardiac care</a></li>
                <li><a className="hover:underline" href="#!">Heart care</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Customer Care</h5>
              <ul className="text-slate-300 space-y-2">
                <li><a className="hover:underline" href="#!">About Us</a></li>
                <li><a className="hover:underline" href="#!">Contact US</a></li>
                <li><a className="hover:underline" href="#!">Get Update</a></li>
              </ul>
            </div>
          </div>

          <div className="bg-sky-900 text-slate-200 py-4">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
              <div className="text-sm font-semibold">All rights Reserved &copy; Rural Health AI, 2024</div>
              <div className="text-sm">Made in India <span className="text-orange-400">♥</span></div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
