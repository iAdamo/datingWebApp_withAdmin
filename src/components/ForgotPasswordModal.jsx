import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faKey } from "@fortawesome/free-solid-svg-icons";
import InputField from "./InputField";
import Button from "./Button";
import ResetLinkSentModal from "./ResetLinkSentModal";
import { post } from "@/utils/api"; // ✅ Import post API helper

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResetLinkModal, setShowResetLinkModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  if (!isOpen) return null;

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    setError("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await post("/auth/password/reset/", { email });
      setShowResetLinkModal(true);
    } catch (err) {
      setError(err.message || "Failed to send reset link. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!showResetLinkModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-offset="150"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute hover:scale-105 transition top-4 right-4 text-gray-500 hover:text-red-700"
            >
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>

            {/* Modal Content */}
            <div className="text-center">
              <div data-aos="fade-down" data-aos-delay="200" className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto">
                <FontAwesomeIcon icon={faKey} className="text-purple-500 text-xl" />
              </div>
              <div data-aos="slide-right" data-aos-delay="200">
                <h2 className="text-xl font-semibold hover:scale-105 transition mt-3">Forgot password?</h2>
                <p className="text-gray-600 text-sm mt-1">
                  No worries, we’ll send you reset instructions.
                </p>
              </div>

              <div className="mt-4">
                <InputField
                  type="email"
                  placeholder="Enter your email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <Button
                text={loading ? "Sending..." : "Reset Password"}
                fullWidth
                onClick={handleResetPassword}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      )}

      {showResetLinkModal && (
        <ResetLinkSentModal
          isOpen={showResetLinkModal}
          onClose={onClose}
          email={email}
        />
      )}
    </>
  );
};

export default ForgotPasswordModal;
