// src/pages/ProfileSetup/Lifestyle.jsx
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import ProgressHeader from "../../components/ProgressHeader";
import SidebarProgress from "./SidebarProgress";

const Lifestyle = ({ nextStep, prevStep, gender, formData, updateFormData }) => {
  const [localData, setLocalData] = useState({
    smoker: formData.smoker || "",
    drinks: formData.drinks || "",
    hasPets: formData.hasPets || "",
    hasAllergies: formData.hasAllergies || "",
    hasDisabilities: formData.hasDisabilities || "",
    disabilityDetails: formData.disabilityDetails || "",
    partnerSmoker: formData.partnerSmoker || "",
    partnerDrinks: formData.partnerDrinks || "",
    ...(gender === "Female" ? { veiled: formData.veiled || "" } : {}),
    ...(gender === "Male" ? { partnerVeiled: formData.partnerVeiled || "" } : {})
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleSelect = (field, value) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "smoker", "drinks", "hasPets", "hasAllergies", "hasDisabilities",
      "partnerSmoker", "partnerDrinks"
    ];

    if (gender === "Female") requiredFields.push("veiled");
    if (gender === "Male") requiredFields.push("partnerVeiled");

    requiredFields.forEach(field => {
      if (!localData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (localData.hasDisabilities === "Yes" && !localData.disabilityDetails?.trim()) {
      newErrors.disabilityDetails = "Please describe the disability";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Lifestyle Data:', localData);
      updateFormData(localData);
      nextStep(localData);
    }
  };

  const circleRadio = (field, value) => (
    <label key={value} className="flex items-center hover:scale-103 transition gap-2 cursor-pointer text-sm">
      <input
        type="radio"
        name={field}
        value={value}
        checked={localData[field] === value}
        onChange={() => handleSelect(field, value)}
        className="accent-purple-600"
      />
      {value}
    </label>
  );

  const selectableRadio = (field, value, label) => (
    <div
      key={value}
      onClick={() => handleSelect(field, value)}
      className={`hover:scale-103 transition flex justify-between items-center border rounded-md px-4 py-2 text-sm cursor-pointer w-full
        ${localData[field] === value ? "bg-purple-100 border-purple-500" : "bg-white border-gray-300"}
        hover:border-purple-400`}
    >
      <span className="text-gray-800">{label}</span>
      <div
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
          localData[field] === value ? "border-purple-600" : "border-gray-300"
        }`}
      >
        {localData[field] === value && <div className="w-2 h-2 bg-purple-600 rounded-full" />}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col rounded-b-2xl">
      <ProgressHeader step={3} />
      <div className="flex flex-col lg:flex-row px-4 py-8 gap-4">
        <SidebarProgress activeStep={3} />
        
        <div data-aos="fade-up" className="flex-1 w-full max-w-[800px] mx-auto bg-white p-8 rounded-2xl shadow-md">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl hover:scale-105 transition font-bold text-purple-700 text-center mb-6">
              Tell us about your Lifestyle
            </h2>

            {/* Personal Lifestyle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {[
                ["smoker", "Are you a smoker?"],
                ["drinks", "Do you drink alcohol?"],
                ["hasPets", "Do you have pets at home?"],
                ["hasAllergies", "Do you suffer from allergies?"],
              ].map(([field, label]) => (
                <div key={field}>
                  <label className="text-xs font-semibold text-gray-700 mb-1 block">{label}</label>
                  <div className="hover:scale-103 transition flex gap-6">
                    {["Yes", "No"].map(opt => circleRadio(field, opt))}
                  </div>
                  {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                </div>
              ))}

              {gender === "Female" && (
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1 block">Are you veiled?</label>
                  <div className="hover:scale-103 transition flex gap-6">
                    {["Yes", "No"].map(opt => circleRadio("veiled", opt))}
                  </div>
                  {errors.veiled && <p className="text-red-500 text-xs mt-1">{errors.veiled}</p>}
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">Do you have any disabilities?</label>
                <div className="hover:scale-103 transition flex gap-6">
                  {["Yes", "No"].map(opt => circleRadio("hasDisabilities", opt))}
                </div>
                {errors.hasDisabilities && <p className="text-red-500 text-xs mt-1">{errors.hasDisabilities}</p>}
                {localData.hasDisabilities === "Yes" && (
                  <div className="mt-3">
                    <label className="text-xs font-semibold text-gray-700 mb-1 block">
                      Please specify the type of disability
                    </label>
                    <input
                      type="text"
                      value={localData.disabilityDetails}
                      onChange={(e) => handleSelect("disabilityDetails", e.target.value)}
                      placeholder="e.g., Visual impairment, Hearing loss"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-purple-500"
                    />
                    {errors.disabilityDetails && (
                      <p className="text-red-500 text-xs mt-1">{errors.disabilityDetails}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Partner Preferences */}
            <div className="relative mb-8 text-center">
              <hr className="border-t border-purple-300" />
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-xs font-medium text-purple-600 uppercase">
                Your Partner Preferences
              </span>
            </div>

            <div className="flex flex-col gap-6 mt-6">
              {[
                ["partnerSmoker", "Should your partner be a smoker?"],
                ["partnerDrinks", "Are you open to a partner who drinks alcohol?"],
              ].map(([field, label]) => (
                <div key={field}>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">{label}</label>
                  <div className="hover:scale-103 transition flex gap-3 text-sm w-full">
                    {["Yes", "No", "No Preference"].map(opt => (
                      <div key={`${field}-${opt}`} className="flex-1">
                        {selectableRadio(field, opt, opt)}
                      </div>
                    ))}
                  </div>
                  {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                </div>
              ))}

              {gender === "Male" && (
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Should your partner be veiled?
                  </label>
                  <div className="hover:scale-103 transition flex gap-3 text-sm w-full">
                    {["Yes", "No", "No Preference"].map(opt => (
                      <div key={`partnerVeiled-${opt}`} className="flex-1">
                        {selectableRadio("partnerVeiled", opt, opt)}
                      </div>
                    ))}
                  </div>
                  {errors.partnerVeiled && (
                    <p className="text-red-500 text-xs mt-1">{errors.partnerVeiled}</p>
                  )}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-10 flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={prevStep}
                className="w-full sm:w-[48%] border hover:scale-104 border-gray-400 text-gray-700 py-2.5 rounded hover:bg-gray-100 hover:border-purple-400 transition"
              >
                Previous
              </button>
              <button
                type="submit"
                className="w-full sm:w-[48%] hover:scale-104 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2.5 rounded hover:opacity-90 hover:shadow-md transition"
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

export default Lifestyle;
