import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import ProgressHeader from "../../components/ProgressHeader";

const ProfileBio = ({ prevStep, formData, updateFormData, nextStep }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.bio?.trim()) {
      alert("Please enter a short bio before proceeding.");
      return;
    }

    console.log('Profile Bio submitted:', { bio: formData.bio });
    nextStep();
  };

  const handleBioChange = (e) => {
    updateFormData({ bio: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <ProgressHeader step={7} />

      <div
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-offset="150"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        className="flex-1 flex items-center justify-center py-12 px-4"
      >
        <button
          type="button"
          onClick={prevStep}
          className="absolute left-8 top-28 text-md text-gray-600 hover:text-purple-500 font-semibold hover:scale-105 transition"
        >
          &larr; Go back
        </button>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md text-center space-y-6"
        >
          <h2 className="text-3xl font-bold text-gray-900 hover:text-purple-500 transition hover:scale-104">
            Almost there! Let's make your profile stand out.
          </h2>

          <div className="text-left w-full">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Tell us a little about yourself
            </label>
            <div className="relative">
              <textarea
                value={formData.bio || ''}
                onChange={handleBioChange}
                name="bio"
                rows={5}
                maxLength={300}
                placeholder="Share your interests, values, or what makes you unique..."
                className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-400 transition resize-none"
                required
              />
              <span className="absolute bottom-2 right-4 text-xs text-gray-400">
                {formData.bio?.length || 0}/300
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full hover:scale-104 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            Next: Add Profile Photo
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileBio;
