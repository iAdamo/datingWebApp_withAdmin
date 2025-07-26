import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { patchUserProfile } from "@/utils/api"; // ✅ Use your existing API utility

const PersonalInfoEditModal = ({ onClose, currentData = {}, onSave }) => {
  const [form, setForm] = useState({
    religion: currentData.religion || "",
    maritalStatus: currentData.maritalStatus || "",
    occupation: currentData.occupation || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.religion || !form.maritalStatus || !form.occupation) {
      toast.error("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      await patchUserProfile({
        religion: form.religion,
        marital_status: form.maritalStatus,
        occupation: form.occupation,
      });

      toast.success("Personal info updated successfully!");
      onSave && onSave(form); // optional: update parent state
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update personal info.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 animate-fade-in-up relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Edit Personal Info
        </h2>

        <div className="space-y-4">
          {/* Religion */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Religion
            </label>
            <input
              type="text"
              name="religion"
              value={form.religion}
              onChange={handleChange}
              placeholder="e.g. Islam, Christianity"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              value={form.maritalStatus}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select status</option>
              <option value="Never Married">Never Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Occupation
            </label>
            <input
              type="text"
              name="occupation"
              value={form.occupation}
              onChange={handleChange}
              placeholder="e.g. Software Engineer"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded text-white transition ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoEditModal;
