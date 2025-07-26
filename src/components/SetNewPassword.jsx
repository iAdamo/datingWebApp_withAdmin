import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

import InputField from "./InputField";
import Button from "./Button";
import PasswordResetSuccess from "./PasswordResetSuccess";
import { post } from "@/utils/api";

const SetNewPasswordModal = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  if (!isOpen) return null;

  const token = new URLSearchParams(location.search).get("token");

  const handlePasswordReset = async () => {
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const result = await post("/auth/reset-password/", {
        password,
        confirm_password: confirmPassword,
        token,
      });

      setLoading(false);
      setShowSuccessModal(true);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Password reset failed. Please try again.");
    }
  };

  return (
    <>
      {!showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 z-50 bg-black/30 backdrop-blur-sm">
          <div
            data-aos="fade-down"
            className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-700 hover:text-red-700"
            >
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>

            <div className="text-center">
              <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto">
                <FontAwesomeIcon icon={faCheckCircle} className="text-purple-500 text-xl" />
              </div>
              <h2 className="text-xl font-semibold mt-3">Set New Password</h2>
              <p className="text-gray-600 text-sm mt-1">
                Your new password must be different from previously used passwords.
              </p>

              <div className="mt-4">
                <InputField
                  type="password"
                  placeholder="Enter new password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-2">
                <InputField
                  type="password"
                  placeholder="Confirm new password"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <Button
                text={loading ? "Resetting..." : "Reset Password"}
                fullWidth
                onClick={handlePasswordReset}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <PasswordResetSuccess isOpen={showSuccessModal} onClose={onClose} />
      )}
    </>
  );
};

export default SetNewPasswordModal;
