import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import { post } from "@/utils/api"; // ← make sure this is correctly set up

const SetPasswordPage = () => {
  const navigate = useNavigate();
  const { uidb64, token } = useParams(); // 🧠 Extract from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onClose = () => {
    navigate("/admin/login");
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleSetPassword = async () => {
    setError("");

    if (!newPassword || !confirmPassword) {
      return setError("Please fill in both fields.");
    }
    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);
    try {
      await post(`/auth/password/reset/confirm/${uidb64}/${token}/`, {
        password: newPassword,
      });
      navigate("/admin/password-reset-success");
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 to-white px-4">
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FontAwesomeIcon icon={faTimes} size="md" />
        </button>

        <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto">
          <FontAwesomeIcon icon={faLock} className="text-purple-600 text-xl" />
        </div>

        <div
          data-aos="slide-down"
          data-aos-delay="200"
          className="hover:scale-105 hover:text-purple-600 transition"
        >
          <h2 className="text-lg font-bold mt-4">Set new Password</h2>
          <p className="text-sm text-gray-600 mt-2">
            Enter a strong new password you’ll remember.
          </p>
        </div>

        <div className="mt-4 space-y-3 hover:scale-105 transition">
          <InputField
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <InputField
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="w-auto hover:scale-105 transition">
          <Button
            text={loading ? "Updating..." : "Update Password"}
            fullWidth
            className="mt-4"
            onClick={handleSetPassword}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default SetPasswordPage;
