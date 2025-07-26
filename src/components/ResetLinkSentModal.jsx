import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import SetNewPasswordModal from "./SetNewPassword";
import { useState, useEffect } from "react";
import { post } from "@/utils/api"; // ✅ make sure this is your working Axios wrapper

const ResetLinkSentModal = ({ isOpen, onClose, email }) => {
  const [resendMessage, setResendMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  if (!isOpen) return null;

  const handleResend = async () => {
    setLoading(true);
    setResendMessage(null);
    try {
      await post("/auth/resend-verification/", { email });
      setResendMessage("Verification link resent successfully!");
    } catch {
      setResendMessage("Failed to resend verification link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 z-[999] bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full relative min-h-[22rem]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-800 hover:text-red-700"
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>

        {/* Content */}
        <div data-aos="fade-up" className="text-center">
          <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto">
            <FontAwesomeIcon icon={faEnvelope} className="text-purple-500 text-xl" />
          </div>

          <div data-aos="slide-left" className="hover:scale-105 transition">
            <h2 className="text-xl font-semibold mt-3">Reset Link Sent</h2>
            <p className="text-gray-600 text-sm mt-1">
              We sent a password reset link to <br />
              <span className="font-semibold">{email}</span>
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
    </div>
  );
};

export default ResetLinkSentModal;
