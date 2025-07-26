// src/pages/ProfileSetup/CareerEducation.jsx
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import ProgressHeader from "../../components/ProgressHeader";
import SidebarProgress from "./SidebarProgress";

const CareerEducation = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [localFormData, setLocalFormData] = useState({
    qualification: formData.qualification || "",
    customQualification: formData.customQualification || "",
    workField: formData.workField || [],
    customOtherWorkField: formData.customOtherWorkField || "",
    workLocation: formData.workLocation || "",
    occupation: formData.occupation || "",
    financialStatus: formData.financialStatus || "",
    incomeRange: formData.incomeRange || "",
    languages: formData.languages || [],
    customOtherLanguage: formData.customOtherLanguage || "",
    partnerQualification: formData.partnerQualification || "",
    customPartnerQualification: formData.customPartnerQualification || "",
    minPartnerQualification: formData.minPartnerQualification || "",
    customMinPartnerQualification: formData.customMinPartnerQualification || "",
    partnerField: formData.partnerField || [],
    customPartnerField: formData.customPartnerField || "",
    partnerLocation: formData.partnerLocation || "",
    partnerOccupation: formData.partnerOccupation || "",
    similarFinance: formData.similarFinance || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const dropdownOptions = {
    qualification: ["High School", "Diploma", "Bachelor's Degree", "Master's Degree", "PhD", "Other"],
    workField: ["Healthcare", "Education", "Engineering", "IT & Technology", "Business & Finance", "NGO & Charity", "Government", "Arts & Media", "Other"],
    occupation: ["Government", "Private", "Freelance"],
    financialStatus: ["Good", "Very Good", "Excellent"],
    incomeRange: [
      "Less than 10,000 AED",
      "10,000–20,000 AED",
      "20,000–30,000 AED",
      "30,000–40,000 AED",
      "40,000–50,000 AED",
      "More than 50,000 AED",
    ],
    languages: ["Arabic", "English", "French", "Turkish", "Persian", "Other"],
  };

  const handleChange = (field, value) => {
    const newData = { ...localFormData, [field]: value };
    setLocalFormData(newData);
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const toggleLanguage = (lang) => {
    let updatedLanguages;
    if (localFormData.languages.includes(lang)) {
      updatedLanguages = localFormData.languages.filter((l) => l !== lang);
      if (lang === "Other") {
        handleChange("customOtherLanguage", "");
      }
    } else {
      updatedLanguages = [...localFormData.languages, lang];
    }
    handleChange("languages", updatedLanguages);
  };

  const validate = () => {
    const requiredFields = [
      "qualification",
      "workLocation",
      "occupation",
      "financialStatus",
      "incomeRange",
      "partnerQualification",
      "partnerLocation",
      "partnerOccupation",
      "similarFinance"
    ];

    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!localFormData[field]) {
        newErrors[field] = "This field is required.";
      }
    });

    if (localFormData.workField.length === 0) {
      newErrors.workField = "Please select at least one field.";
    }

    if (
      localFormData.workField.includes("Other") &&
      (!localFormData.customOtherWorkField || !localFormData.customOtherWorkField.trim())
    ) {
      newErrors.customOtherWorkField = "Please specify your field of work.";
    }

    if (!localFormData.partnerQualification) {
      newErrors.partnerQualification = "Please select a preferred qualification.";
    }

    if (
      localFormData.partnerQualification === "Other" &&
      (!localFormData.customPartnerQualification || !localFormData.customPartnerQualification.trim())
    ) {
      newErrors.customPartnerQualification = "Please specify the preferred qualification.";
    }

    if (localFormData.partnerField.length === 0) {
      newErrors.partnerField = "Please select at least one preferred field.";
    }

    if (!localFormData.minPartnerQualification) {
      newErrors.minPartnerQualification = "Please select a minimum preferred qualification.";
    }

    if (
      localFormData.minPartnerQualification === "Other" &&
      (!localFormData.customMinPartnerQualification || !localFormData.customMinPartnerQualification.trim())
    ) {
      newErrors.customMinPartnerQualification = "Please specify the minimum qualification.";
    }

    if (
      localFormData.partnerField.includes("Other") &&
      !localFormData.customPartnerField.trim()
    ) {
      newErrors.customPartnerField = "Please specify the preferred field of work.";
    }

    if (localFormData.languages.length === 0) {
      newErrors.languages = "Please select at least one language.";
    }

    if (
      localFormData.languages.includes("Other") &&
      !localFormData.customOtherLanguage.trim()
    ) {
      newErrors.customOtherLanguage = "Please specify the other language.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Career & Education Form Data:", localFormData);
      updateFormData(localFormData);
      nextStep(localFormData);
    }
  };

  const inputClass = (field) =>
    `border ${errors[field] ? "border-red-500" : "border-gray-300"} rounded text-xs p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition`;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <ProgressHeader step={5} />
      <div className="flex flex-col lg:flex-row gap-4 px-4 py-8">
        <SidebarProgress activeStep={5} />
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
              Tell us about your Career & Education
            </h2>

            <div data-aos="slide-right" data-aos-delay="500" className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium mb-1">Academic Qualification *</label>
                <select
                  value={localFormData.qualification}
                  onChange={(e) => handleChange("qualification", e.target.value)}
                  className={inputClass("qualification")}
                >
                  <option value="">Select qualification</option>
                  {dropdownOptions.qualification.map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>

                {localFormData.qualification === "Other" && (
                  <input
                    type="text"
                    value={localFormData.customQualification || ""}
                    onChange={(e) => handleChange("customQualification", e.target.value)}
                    placeholder="Please specify your qualification"
                    className="border border-purple-500 rounded px-3 py-2 text-sm mt-2 w-full"
                  />
                )}

                {errors.qualification && (
                  <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>
                )}

                {localFormData.qualification === "Other" && errors.customQualification && (
                  <p className="text-red-500 text-xs mt-1">{errors.customQualification}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Field of Work *</label>
                <div className="flex flex-wrap gap-2">
                  {dropdownOptions.workField.map((field) => (
                    <label key={field} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        value={field}
                        checked={localFormData.workField.includes(field)}
                        onChange={() => {
                          let newFields;
                          if (localFormData.workField.includes(field)) {
                            newFields = localFormData.workField.filter((f) => f !== field);
                            if (field === "Other") {
                              handleChange("customOtherWorkField", "");
                            }
                          } else {
                            newFields = [...localFormData.workField, field];
                          }
                          handleChange("workField", newFields);
                        }}
                        className="form-checkbox text-purple-600 hover:scale-105 transition duration-150 ease-in-out"
                      />
                      <span>{field}</span>
                    </label>
                  ))}

                  {localFormData.workField.includes("Other") && (
                    <input
                      type="text"
                      value={localFormData.customOtherWorkField || ""}
                      onChange={(e) => handleChange("customOtherWorkField", e.target.value)}
                      placeholder="Please specify"
                      className="border border-purple-500 rounded px-3 py-1 text-sm mt-2 w-full"
                    />
                  )}
                </div>

                {errors.workField && (
                  <p className="text-red-500 text-xs mt-1">{errors.workField}</p>
                )}

                {localFormData.workField.includes("Other") && errors.customOtherWorkField && (
                  <p className="text-red-500 text-xs mt-1">{errors.customOtherWorkField}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Work Location (Emirate) *</label>
                <select
                  value={localFormData.workLocation}
                  onChange={(e) => handleChange("workLocation", e.target.value)}
                  className={inputClass("workLocation")}
                >
                  <option value="">Select Emirate</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ajman">Ajman</option>
                  <option value="Umm Al-Quwain">Umm Al-Quwain</option>
                  <option value="Ras Alkhaimah">Ras Alkhaimah</option>
                  <option value="Fujairah">Fujairah</option>
                </select>
                {errors.workLocation && (
                  <p className="text-red-500 text-xs mt-1">{errors.workLocation}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Occupation *</label>
                <select
                  value={localFormData.occupation}
                  onChange={(e) => handleChange("occupation", e.target.value)}
                  className={inputClass("occupation")}
                >
                  <option value="">Select occupation</option>
                  {dropdownOptions.occupation.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                {errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Financial Status *</label>
                <select
                  value={localFormData.financialStatus}
                  onChange={(e) => handleChange("financialStatus", e.target.value)}
                  className={inputClass("financialStatus")}
                >
                  <option value="">Select status</option>
                  {dropdownOptions.financialStatus.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
                {errors.financialStatus && <p className="text-red-500 text-xs mt-1">{errors.financialStatus}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Monthly Income *</label>
                <select
                  value={localFormData.incomeRange}
                  onChange={(e) => handleChange("incomeRange", e.target.value)}
                  className={inputClass("incomeRange")}
                >
                  <option value="">Select income</option>
                  {dropdownOptions.incomeRange.map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
                {errors.incomeRange && <p className="text-red-500 text-xs mt-1">{errors.incomeRange}</p>}
              </div>
            </div>

            <div data-aos="slide-left" data-aos-duration="500" className="mt-6 mb-4">
              <label className="block text-xs font-medium mb-2">Languages you know *</label>
              <div className="flex flex-wrap gap-3">
                {dropdownOptions.languages.map((lang) => {
                  const isSelected = localFormData.languages.includes(lang);
                  return (
                    <div
                      key={lang}
                      onClick={() => toggleLanguage(lang)}
                      className={`hover:scale-104 flex items-center justify-between px-4 py-2 w-fit min-w-[100px] rounded text-xs font-medium cursor-pointer border transition-all duration-200
                        ${isSelected
                          ? "bg-purple-100 text-purple-700 border-purple-500"
                          : "bg-white text-gray-700 border-gray-300 hover:border-purple-400"
                        }`}
                    >
                      <span>{lang}</span>
                      <div
                        className={`ml-2 w-4 h-4 rounded border-2 flex items-center justify-center
                          ${isSelected ? "border-purple-600" : "border-gray-300"}`}
                      >
                        {isSelected && <div className="w-2 h-2 bg-purple-600 rounded" />}
                      </div>
                    </div>
                  );
                })}

                {localFormData.languages.includes("Other") && (
                  <input
                    type="text"
                    value={localFormData.customOtherLanguage || ""}
                    onChange={(e) => handleChange("customOtherLanguage", e.target.value)}
                    placeholder="Please specify"
                    className="border border-purple-500 rounded px-3 py-2 text-sm mt-2 w-full"
                  />
                )}
              </div>

              {localFormData.languages.length === 0 && (
                <p className="text-red-500 text-xs mt-1">Please select at least one language.</p>
              )}

              {localFormData.languages.includes("Other") && errors.customOtherLanguage && (
                <p className="text-red-500 text-xs mt-1">{errors.customOtherLanguage}</p>
              )}
            </div>

            <div data-aos="fade-down" data-aos-delay="500" className="relative mb-8 text-center">
              <hr className="border-t border-purple-300" />
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-xs font-medium text-purple-600 uppercase">
                Your Partner Preferences
              </span>
            </div>

            <div data-aos="slide-right" data-aos-delay="500" className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium mb-1">Preferred Academic Qualification *</label>
                <select
                  value={localFormData.partnerQualification}
                  onChange={(e) => handleChange("partnerQualification", e.target.value)}
                  className={inputClass("partnerQualification")}
                >
                  <option value="">Select qualification</option>
                  {dropdownOptions.qualification.map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>

                {localFormData.partnerQualification === "Other" && (
                  <input
                    type="text"
                    value={localFormData.customPartnerQualification || ""}
                    onChange={(e) => handleChange("customPartnerQualification", e.target.value)}
                    placeholder="Please specify"
                    className="border border-purple-500 rounded px-3 py-2 text-sm mt-2 w-full"
                  />
                )}

                {errors.partnerQualification && (
                  <p className="text-red-500 text-xs mt-1">{errors.partnerQualification}</p>
                )}

                {localFormData.partnerQualification === "Other" && errors.customPartnerQualification && (
                  <p className="text-red-500 text-xs mt-1">{errors.customPartnerQualification}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Minimum Preferred Qualification *</label>
                <select
                  value={localFormData.minPartnerQualification}
                  onChange={(e) => handleChange("minPartnerQualification", e.target.value)}
                  className={inputClass("minPartnerQualification")}
                >
                  <option value="">Select minimum qualification</option>
                  {dropdownOptions.qualification.map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>

                {localFormData.minPartnerQualification === "Other" && (
                  <input
                    type="text"
                    value={localFormData.customMinPartnerQualification || ""}
                    onChange={(e) => handleChange("customMinPartnerQualification", e.target.value)}
                    placeholder="Please specify"
                    className="border border-purple-500 rounded px-3 py-2 text-sm mt-2 w-full"
                  />
                )}

                {errors.minPartnerQualification && (
                  <p className="text-red-500 text-xs mt-1">{errors.minPartnerQualification}</p>
                )}

                {localFormData.minPartnerQualification === "Other" && errors.customMinPartnerQualification && (
                  <p className="text-red-500 text-xs mt-1">{errors.customMinPartnerQualification}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Preferred Field of Work *</label>
                <div className="flex flex-wrap gap-2">
                  {dropdownOptions.workField.map((field) => (
                    <label key={field} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        value={field}
                        checked={localFormData.partnerField.includes(field)}
                        onChange={() => {
                          let updatedFields;
                          if (localFormData.partnerField.includes(field)) {
                            updatedFields = localFormData.partnerField.filter((f) => f !== field);
                            if (field === "Other") {
                              handleChange("customPartnerField", "");
                            }
                          } else {
                            updatedFields = [...localFormData.partnerField, field];
                          }
                          handleChange("partnerField", updatedFields);
                        }}
                        className="form-checkbox text-purple-600 hover:scale-105 transition duration-150 ease-in-out"
                      />
                      <span>{field}</span>
                    </label>
                  ))}

                  {localFormData.partnerField.includes("Other") && (
                    <input
                      type="text"
                      value={localFormData.customPartnerField || ""}
                      onChange={(e) => handleChange("customPartnerField", e.target.value)}
                      placeholder="Please specify"
                      className="border border-purple-500 rounded px-3 py-1 text-sm mt-2 w-full"
                    />
                  )}
                </div>

                {errors.partnerField && (
                  <p className="text-red-500 text-xs mt-1">{errors.partnerField}</p>
                )}
                {localFormData.partnerField.includes("Other") && errors.customPartnerField && (
                  <p className="text-red-500 text-xs mt-1">{errors.customPartnerField}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Preferred Work Location *</label>
                <select
                  value={localFormData.partnerLocation}
                  onChange={(e) => handleChange("partnerLocation", e.target.value)}
                  className={inputClass("partnerLocation")}
                >
                  <option value="">Select Emirate</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ajman">Ajman</option>
                  <option value="Umm Al-Quwain">Umm Al-Quwain</option>
                  <option value="Ras Alkhaimah">Ras Alkhaimah</option>
                  <option value="Fujairah">Fujairah</option>
                </select>
                {errors.partnerLocation && (
                  <p className="text-red-500 text-xs mt-1">{errors.partnerLocation}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Preferred Occupation *</label>
                <select
                  value={localFormData.partnerOccupation}
                  onChange={(e) => handleChange("partnerOccupation", e.target.value)}
                  className={inputClass("partnerOccupation")}
                >
                  <option value="">Select occupation</option>
                  {dropdownOptions.occupation.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                {errors.partnerOccupation && <p className="text-red-500 text-xs mt-1">{errors.partnerOccupation}</p>}
              </div>
            </div>

            <div data-aos="flip-left" data-aos-delay="500" className="mt-6">
              <label className="block text-xs font-medium mb-1">Should your partner have a similar financial status? *</label>
              <div className="hover:scale-103 transition flex gap-3">
                {["Yes", "No", "No Preference"].map((opt) => (
                  <div
                    key={opt}
                    onClick={() => handleChange("similarFinance", opt)}
                    className={`border rounded px-4 py-2 cursor-pointer text-xs ${
                      localFormData.similarFinance === opt
                        ? "bg-purple-100 border-purple-500 text-purple-700"
                        : "border-gray-300 text-gray-700 hover:border-purple-400"
                    }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
              {errors.similarFinance && <p className="text-red-500 text-xs mt-1">{errors.similarFinance}</p>}
            </div>

            <div data-aos="fade-up" data-aos-delay="500" className="flex justify-between mt-10 flex-col sm:flex-row gap-4">
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

export default CareerEducation;