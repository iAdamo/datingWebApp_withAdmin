import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { patchUserProfile } from "@/utils/api"; // ✅ Use the proper wrapper

const BioEditModal = ({ bio, setBio, onClose }) => {
  const [tempBio, setTempBio] = useState(bio);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!tempBio.trim()) {
      toast.error("Bio cannot be empty");
      return;
    }

    setLoading(true);
    try {
      await patchUserProfile({ bio: tempBio.trim() });

      setBio(tempBio.trim());
      toast.success("Bio updated successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update bio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 animate-fade-in-up relative">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Tell the world about yourself!</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="text-gray-500 cursor-pointer"
            onClick={onClose}
          />
        </div>

        <p className="text-gray-500 text-sm mt-2">
          Write a short bio to let potential matches know who you are.
        </p>

        <textarea
          className="w-full text-gray-600 h-44 p-2 border border-gray-300 rounded mt-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={tempBio}
          maxLength={200}
          onChange={(e) => setTempBio(e.target.value)}
        />

        <p className="text-gray-400 text-sm text-right">
          {tempBio.length}/200
        </p>

        <button
          className={`w-full text-white py-2 rounded mt-4 transition ${
            loading
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default BioEditModal;
