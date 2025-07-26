import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { faEnvelope, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../../components/Button";
import { post } from "@/utils/api"; // ✅ Import your API helper

const ResetLinkSentPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const email = localStorage.getItem("admin_reset_email"); // ✅ Must be set during forgot flow

  const onClose = () => {
    navigate("/admin/login");
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleResend = async () => {
    if (!email) {
      setResendMessage("Email not found. Try going back.");
      return;
    }

    setLoading(true);
    try {
      await post("/auth/resend-verification/", { email });
      setResendMessage("Reset link resent to your email.");
    } catch {
      setResendMessage("Failed to resend. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 to-white px-4">
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-offset="150"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FontAwesomeIcon icon={faTimes} size="md" />
        </button>

        {/* Envelope Icon */}
        <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto">
          <FontAwesomeIcon icon={faEnvelope} className="text-purple-600 text-xl" />
        </div>

        {/* Title + Message */}
        <div data-aos="slide-down" data-aos-delay="200" className="hover:scale-105 hover:text-purple-600 transition">
          <h2 className="text-lg font-bold mt-4">Reset Link Sent</h2>
          <p className="text-sm text-gray-600 mt-2">
            We’ve sent a reset password link to your email. Please check your inbox.
          </p>
        </div>

        {/* Button + Resend */}
        <div data-aos="slide-up" data-aos-delay="200" className="w-auto hover:scale-105 transition">
          <Button
            text={loading ? "Sending..." : "Resend Reset Link"}
            fullWidth
            className="mt-6"
            onClick={handleResend}
          />
          <p className="text-xs text-gray-600 mt-3">
            Didn’t receive the email?{" "}
            <span
              onClick={handleResend}
              className="text-purple-600 hover:underline cursor-pointer font-medium"
            >
              {loading ? "Sending..." : "Click to resend"}
            </span>
          </p>
          {resendMessage && (
            <p className="text-sm text-gray-500 mt-1">{resendMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetLinkSentPage;
