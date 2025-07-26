import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faTimes } from "@fortawesome/free-solid-svg-icons";
import InputField from "../../../../components/InputField";
import Button from "../../../../components/Button";
import { post } from "@/utils/api"; // ✅ make sure alias works or fix the import path

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onClose = () => {
    navigate("/admin/login");
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleSubmit = async () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await post("/auth/password/reset/", { email });
      setSuccess("Reset link sent successfully.");
      setTimeout(() => {
        navigate("/admin/reset-link");
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/30 px-4 inset-0 z-50">
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-offset="150"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        className="bg-white p-6 rounded-xl max-w-sm w-full shadow-lg text-center animate-fade-in"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FontAwesomeIcon icon={faTimes} size="md" />
        </button>

        <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-4">
          <FontAwesomeIcon icon={faKey} className="text-purple-700 text-xl" />
        </div>

        <h2 className="text-xl font-bold text-gray-800 hover:scale-105 transition hover:text-purple-700">Forgot password?</h2>
        <p className="text-sm text-gray-600 mb-4 hover:font-semibold hover:scale-105 transition">
          We'll send a reset link to your email.
        </p>

        <div className='relative hover:scale-105 transition'>
          <InputField
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        {success && <p className="text-sm text-green-600 mt-1">{success}</p>}

        <div data-aos="slide-up" data-aos-delay="200" className='w-auto hover:scale-105 transition'>
          <Button
            text={loading ? "Sending..." : "Send Reset Link"}
            fullWidth
            onClick={handleSubmit}
            className="mt-4"
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
