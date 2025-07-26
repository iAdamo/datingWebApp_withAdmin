import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { post } from "@/utils/api"; // ✅ Import your API helper

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await post("/auth/login/", {
        email,
        password,
      });

      // ✅ You can customize this based on your backend response
      localStorage.setItem("admin_access_token", res.access_token); // or res.access, etc.
      localStorage.setItem("adminLoggedIn", "true");

      navigate("/admin");
    } catch (err) {
      setError(err.message || "Invalid login credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f7e8ff] to-[#cda9ee] p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-6" data-aos="fade-up">
        <div data-aos="slide-right" className="text-center hover:scale-105">
          <h2 className="text-2xl font-bold text-gray-900">Melkha Admin Portal</h2>
          <p className="text-sm text-gray-600 mt-1">Enter your credentials to access the admin portal</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email Field */}
          <div data-aos="slide-down">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative hover:scale-105">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="admin@example.com"
              />
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Password Field */}
          <div data-aos="slide-down">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative hover:scale-105">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="••••••••"
              />
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Checkbox + Forgot */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              Remember me for 30 days
            </label>
            <span
              className="text-red-500 hover:underline cursor-pointer hover:font-semibold"
              onClick={() => navigate("/admin/forgot-password")}
            >
              Forgot Password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#693EE0] text-white font-semibold py-2 hover:scale-105 rounded-md hover:opacity-90 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
