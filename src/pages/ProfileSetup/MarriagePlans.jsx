import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import ProgressHeader from "../../components/ProgressHeader";
import SidebarProgress from "./SidebarProgress";

const MarriagePlans = ({ nextStep, prevStep, formData, updateFormData }) => {
  const [errors, setErrors] = useState({});
  const [localData, setLocalData] = useState({
    typeOfMarriage: formData.typeOfMarriage || "",
    hasScholarshipAbroad: formData.hasScholarshipAbroad || "",
    wantsPolygamy: formData.wantsPolygamy || "",
    wantsChildren: formData.wantsChildren || "",
    partnerRelocate: formData.partnerRelocate || "",
    partnerPolygamy: formData.partnerPolygamy || "",
    partnerWantsChildren: formData.partnerWantsChildren || "",
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleSelect = (field, value) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const requiredFields = [
      "typeOfMarriage",
      "hasScholarshipAbroad",
      "wantsPolygamy",
      "wantsChildren",
      "partnerRelocate",
      "partnerPolygamy",
      "partnerWantsChildren"
    ];

    const newErrors = {};
    requiredFields.forEach(field => {
      if (!localData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Marriage Plans Data:', localData);
      updateFormData(localData);
      nextStep(localData);
    }
  };

  const selectableRadio = (field, value, label) => (
    <div
      key={value}
      onClick={() => handleSelect(field, value)}
      className={`flex justify-between items-center border rounded-md px-3 py-2 w-full cursor-pointer text-xs
        ${localData[field] === value
          ? "bg-purple-100 border-purple-500"
          : "bg-white border-gray-300"
        } hover:border-purple-400 transition duration-200`}
    >
      <span className="text-gray-800">{label}</span>
      <div
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
          localData[field] === value ? "border-purple-600" : "border-gray-300"
        }`}
      >
        {localData[field] === value && (
          <div className="w-2 h-2 bg-purple-600 rounded-full" />
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col rounded-b-2xl">
      <ProgressHeader step={4} />

      <div className="flex flex-col lg:flex-row px-4 py-8 gap-4">
        <SidebarProgress activeStep={4} />

        <div
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-offset="150"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          className="flex-1 w-full max-w-[800px] mx-auto bg-white p-8 rounded-2xl shadow-md"
        >
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-purple-700 text-center hover:scale-105 transition mb-6">
              Tell us about your Marriage Plans
            </h2>

            {/* Section 1 */}
            <div data-aos="slide-left" data-aos-delay="500" className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {/* Type of Marriage */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Type of Marriage</label>
                <div className="hover:scale-105 transition grid grid-cols-2 gap-2">
                  {["Traditional", "External"].map((opt) => (
                    <div key={`typeOfMarriage-${opt}`}>
                      {selectableRadio("typeOfMarriage", opt, opt)}
                    </div>
                  ))}
                </div>
                {errors.typeOfMarriage && <p className="text-xs text-red-500 mt-1">{errors.typeOfMarriage}</p>}
              </div>

              {/* Scholarship Abroad */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Do you have a scholarship and wish to marry and take your spouse abroad?
                </label>
                <div className="hover:scale-105 transition grid grid-cols-2 gap-2">
                  {["Yes", "No"].map((opt) => (
                    <div key={`hasScholarshipAbroad-${opt}`}>
                      {selectableRadio("hasScholarshipAbroad", opt, opt)}
                    </div>
                  ))}
                </div>
                {errors.hasScholarshipAbroad && <p className="text-xs text-red-500 mt-1">{errors.hasScholarshipAbroad}</p>}
              </div>

              {/* Wants Polygamy */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Do you wish for polygamy?</label>
                <div className="hover:scale-105 transition grid grid-cols-2 gap-2">
                  {["Yes", "No"].map((opt) => (
                    <div key={`wantsPolygamy-${opt}`}>
                      {selectableRadio("wantsPolygamy", opt, opt)}
                    </div>
                  ))}
                </div>
                {errors.wantsPolygamy && <p className="text-xs text-red-500 mt-1">{errors.wantsPolygamy}</p>}
              </div>

              {/* Wants Children */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Do you wish to have children?</label>
                <div className="hover:scale-105 transition grid grid-cols-2 gap-2">
                  {["Yes", "No"].map((opt) => (
                    <div key={`wantsChildren-${opt}`}>
                      {selectableRadio("wantsChildren", opt, opt)}
                    </div>
                  ))}
                </div>
                {errors.wantsChildren && <p className="text-xs text-red-500 mt-1">{errors.wantsChildren}</p>}
              </div>
            </div>

            {/* Divider */}
            <div data-aos="fade-down" data-aos-delay="500" className="relative mb-8 text-center">
              <hr className="border-t border-purple-300" />
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-xs font-medium text-purple-600 uppercase">
                Your Partner Preferences
              </span>
            </div>

            {/* Partner Preferences */}
            <div data-aos="slide-left" data-aos-delay="500" className="grid grid-cols-1 gap-5 text-xs">
              {[
                ["partnerRelocate", "Should your partner be willing to relocate with you?"],
                ["partnerPolygamy", "Should your partner be open to polygamy?"],
                ["partnerWantsChildren", "Do you want a partner who wants children?"]
              ].map(([field, label]) => (
                <div key={field}>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">{label}</label>
                  <div className="hover:scale-103 transition grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {["Yes", "No", "No Preference"].map((opt) => (
                      <div key={`${field}-${opt}`}>
                        {selectableRadio(field, opt, opt)}
                      </div>
                    ))}
                  </div>
                  {errors[field] && <p className="text-xs text-red-500 mt-1">{errors[field]}</p>}
                </div>
              ))}
            </div>

            {/* Navigation */}
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

export default MarriagePlans;
