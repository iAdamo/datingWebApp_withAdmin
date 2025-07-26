import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faKey,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { changePassword } from "@/utils/api"; // Adjust the path as needed

const PasswordSettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await changePassword({
        old_password: currentPassword,
        new_password: newPassword,
      });

      toast.success("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Password Settings</h2>

      <form onSubmit={handlePasswordUpdate} className="space-y-5">
        {/* Current Password */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            <FontAwesomeIcon icon={faLock} className="mr-2" />
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            className="w-full border px-4 py-2 rounded-md text-sm focus:outline-none focus:ring focus:ring-purple-200"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            <FontAwesomeIcon icon={faKey} className="mr-2" />
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full border px-4 py-2 rounded-md text-sm focus:outline-none focus:ring focus:ring-purple-200"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter new password"
            className="w-full border px-4 py-2 rounded-md text-sm focus:outline-none focus:ring focus:ring-purple-200"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 bg-purple-600 text-white px-6 py-2 rounded-md text-sm ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
          }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default PasswordSettings;
