import AOS from "aos";
import "aos/dist/aos.css";
import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import ProgressHeader from "../../components/ProgressHeader";

const ProfileImage = ({ prevStep, formData, updateFormData, onFinalSubmit, isSubmitting }) => {
  const [previewUrl, setPreviewUrl] = useState(formData.profileImage ? URL.createObjectURL(formData.profileImage) : null);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPEG, PNG, etc.)");
      return;
    }

    setError("");
    setPreviewUrl(URL.createObjectURL(file));
    updateFormData({ profileImage: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.profileImage) {
      setError("Please upload a profile image or click Skip");
      return;
    }

    try {
      await onFinalSubmit();
    } catch (error) {
      console.error("Profile submission failed:", error);
      setError("Failed to upload image. Please try again.");
    }
  };

  const handleSkip = async () => {
    try {
      await onFinalSubmit();
    } catch (error) {
      console.error("Profile submission failed:", error);
      setError("Failed to submit profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <ProgressHeader step={8} />

      <div className="px-4 sm:px-10 mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="flex font-semibold hover:scale-105 items-center text-sm text-gray-600 hover:text-purple-600 transition"
          disabled={isSubmitting}
        >
          <span className="mr-1">←</span> Go back
        </button>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-offset="150"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        className="flex-1 flex flex-col items-center justify-center px-4 py-12"
      >
        <h2 className="text-3xl hover:text-purple-500 hover:scale-105 transition font-semibold text-center mb-8">
          Show off your best smile
        </h2>

        <label
          htmlFor="upload"
          className={`w-48 h-48 border-2 border-dashed rounded-full flex items-center justify-center cursor-pointer transition ${
            error ? 'border-red-500' : 'border-gray-300 hover:border-purple-400'
          }`}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="text-center text-sm text-gray-600">
              <FiUploadCloud className="mx-auto mb-2 text-2xl" />
              <p>Choose a file or drag & drop</p>
              <p className="text-xs text-gray-400 mt-1">Max 5MB, JPG/PNG</p>
            </div>
          )}
          <input
            type="file"
            id="upload"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={isSubmitting}
          />
        </label>

        {error && (
          <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
        )}

        <p className="text-md text-gray-600 hover:scale-103 transition mt-6 text-center max-w-md">
          Upload a clear, recent photo of yourself. This increases your chances of making great connections.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full max-w-[400px]">
          <button
            type="button"
            onClick={handleSkip}
            disabled={isSubmitting}
            className="w-full hover:scale-104 border border-gray-400 text-gray-700 py-2.5 rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Skip for Now'}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.profileImage}
            className="w-full hover:scale-104 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2.5 rounded hover:opacity-90 hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating Profile...' : 'Create Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
