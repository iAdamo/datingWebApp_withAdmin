import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";
import ProgressHeader from "../../components/ProgressHeader";
import SidebarProgress from "./SidebarProgress";

const InterestsAndHobbies = ({ nextStep, prevStep, formData, updateFormData }) => {
  const hobbyOptions = [
    { name: "Reading", color: "text-sky-500", bg: "bg-sky-100" },
    { name: "Travel", color: "text-yellow-500", bg: "bg-yellow-100" },
    { name: "Cooking", color: "text-teal-500", bg: "bg-teal-100" },
    { name: "Music", color: "text-gray-700", bg: "bg-gray-200" },
    { name: "Writing", color: "text-gray-800", bg: "bg-gray-200" },
    { name: "Fitness", color: "text-purple-500", bg: "bg-purple-100" },
    { name: "Painting", color: "text-gray-800", bg: "bg-gray-200" },
    { name: "Gym", color: "text-gray-800", bg: "bg-gray-200" },
    { name: "Baking", color: "text-gray-800", bg: "bg-gray-200" },
    { name: "Acting & Theatre", color: "text-gray-800", bg: "bg-gray-200" },
    { name: "Yoga & Meditation", color: "text-gray-800", bg: "bg-gray-200" },
    { name: "Swimming", color: "text-gray-800", bg: "bg-gray-200" },
    { name: "Dance", color: "text-gray-800", bg: "bg-gray-200" },
    { name: "Food Blogging", color: "text-gray-800", bg: "bg-gray-200" },
    { name: "Public Speaking & Debating", color: "text-purple-600", bg: "bg-purple-100" },
    { name: "Comedy", color: "text-gray-800", bg: "bg-gray-200" },
    { name: "Fashion", color: "text-gray-800", bg: "bg-gray-200" },
    { name: "Collecting", color: "text-gray-800", bg: "bg-gray-200" },
    { name: "Social Volunteering & Charity Work", color: "text-orange-500", bg: "bg-orange-100" },
    { name: "Content Creation", color: "text-yellow-500", bg: "bg-yellow-100" },
  ];

  // Initialize local state from props
  const [localFormData, setLocalFormData] = useState({
    hobbies: Array.isArray(formData.hobbies) ? formData.hobbies : [],
    partnerHobbyPreference: formData.partnerHobbyPreference || ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []); 

  const toggleHobby = (hobby) => {
    setLocalFormData(prev => {
      const newHobbies = prev.hobbies.includes(hobby)
        ? prev.hobbies.filter(h => h !== hobby)
        : [...prev.hobbies, hobby];
      return { ...prev, hobbies: newHobbies };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (localFormData.hobbies.length === 0 || !localFormData.partnerHobbyPreference) {
      setError("Please select at least one hobby and a partner preference.");
      return;
    }

    // Log the form data before proceeding
    console.log('Interests & Hobbies Data:', localFormData);
    
    // Update parent form data
    updateFormData({
      hobbies: localFormData.hobbies,
      partnerHobbyPreference: localFormData.partnerHobbyPreference
    });
    
    setError("");
    nextStep();
  };

  const selectableRadio = (value) => (
    <div
      onClick={() => setLocalFormData(prev => ({ ...prev, partnerHobbyPreference: value }))}
      className={`hover:scale-103 transition flex justify-between items-center border rounded-md px-3 py-2 text-xs cursor-pointer w-full sm:w-[30%]
        ${localFormData.partnerHobbyPreference === value ? "bg-purple-100 border-purple-500" : "bg-white border-gray-300"}
        hover:border-purple-400 transition-all duration-200`}
    >
      <span className="text-gray-800">{value}</span>
      <div
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
          ${localFormData.partnerHobbyPreference === value ? "border-purple-600" : "border-gray-300"}`}
      >
        {localFormData.partnerHobbyPreference === value && <div className="w-2 h-2 bg-purple-600 rounded-full" />}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col rounded-b-2xl">
      <ProgressHeader step={6} />
      <div className="flex flex-col lg:flex-row px-4 py-8 gap-4">
        <SidebarProgress activeStep={6} />

        <div 
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-offset="150"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out" 
          className="flex-1 w-full max-w-[800px] mx-auto bg-white p-8 rounded-2xl shadow-md"
        >
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl hover:scale-105 transition font-bold text-purple-700 text-center mb-6">
              Tell us about your Interests & Hobbies
            </h2>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">What are your hobbies?</label>
              <div className="hover:scale-103 transition flex flex-wrap gap-2">
                {hobbyOptions.map((hobby) => (
                  <button
                    key={hobby.name}
                    type="button"
                    onClick={() => toggleHobby(hobby.name)}
                    className={`hover:scale-103 transition flex items-center gap-2 px-3 py-2 rounded-full border text-xs
                      ${localFormData.hobbies.includes(hobby.name)
                        ? `${hobby.bg} ${hobby.color} border-purple-500 shadow-sm`
                        : `${hobby.bg} ${hobby.color} border-transparent`}`}
                  >
                    <span className="items-center text-xs">⚡</span>
                    {hobby.name}
                  </button>
                ))}
              </div>
            </div>

            <div data-aos="fade-down" data-aos-delay="300" className="my-10 relative text-center">
              <hr className="border-t border-purple-300" />
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-xs font-medium text-purple-600 uppercase">
                Your Partner Preferences
              </span>
            </div>

            <div className="space-y-4 mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Do you want a partner with similar hobbies?
              </label>
              <div className="flex flex-col w-full sm:flex-row gap-3">
                {["Yes", "No", "Open to any"].map((option) => (
                  <div key={option}>
                    {selectableRadio(option)}
                  </div>
                ))}
              </div>
            </div>

            {error && <p className="text-red-500 mt-4 text-sm text-center">{error}</p>}

            <div className="flex justify-between mt-10 flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={prevStep}
                className="w-full hover:scale-104 sm:w-[48%] border border-gray-400 text-gray-700 py-2.5 rounded hover:bg-gray-100 hover:border-purple-400 transition"
              >
                Previous
              </button>
              <button
                type="submit"
                className="w-full hover:scale-104 sm:w-[48%] bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2.5 rounded hover:opacity-90 hover:shadow-md transition"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InterestsAndHobbies;
