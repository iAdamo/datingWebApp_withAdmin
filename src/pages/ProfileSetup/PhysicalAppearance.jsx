import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import ProgressHeader from "../../components/ProgressHeader";
import SidebarProgress from "./SidebarProgress";

const PhysicalAppearance = ({ nextStep, prevStep, formData, updateFormData }) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const inputClass = "border border-gray-300 rounded text-xs p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-400 transition";

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSelect = (field, value) => {
    updateFormData({ [field]: value });
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const requiredFields = [
      'height', 'weight', 'skinColor', 'eyeColor', 'hairColor',
      'partnerHeight', 'partnerWeight', 'partnerSkinColor', 'partnerEyeColor', 'partnerHairColor'
    ];

    const newErrors = {};
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Physical Appearance Data:', {
        height: formData.height,
        weight: formData.weight,
        skinColor: formData.skinColor,
        eyeColor: formData.eyeColor,
        hairColor: formData.hairColor,
        partnerHeight: formData.partnerHeight,
        partnerWeight: formData.partnerWeight,
        partnerSkinColor: formData.partnerSkinColor,
        partnerEyeColor: formData.partnerEyeColor,
        partnerHairColor: formData.partnerHairColor
      });
      nextStep();
    }
  };

  const skinColors = ["Fair", "Light", "Medium", "Olive", "Brown", "Dark"];
  const eyeColors = ["Hazel", "Green", "Brown", "Blue", "Amber", "Gray"];
  const hairColors = ["Black", "Blonde", "Brown", "Grey", "Red", "White"];

  const SelectField = ({ label, name, options }) => (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-700">{label}</label>
      <select
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        className={inputClass}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
    </div>
  );

  const InputField = ({ label, name, type = "text", min, max }) => (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        min={min}
        max={max}
        placeholder={`Enter ${label.toLowerCase()}`}
        className={inputClass}
      />
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col rounded-b-2xl">
      <ProgressHeader step={3} />

      <div className="flex flex-col lg:flex-row gap-4 px-4 py-8">
        <SidebarProgress activeStep={3} />

        <div data-aos="fade-up" className="flex-1 w-full max-w-[800px] mx-auto bg-white p-8 rounded-2xl shadow-md">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl hover:scale-105 transition font-bold text-purple-700 text-center mb-6">
              Tell us about your Physical Appearance
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Height (cm)" name="height" type="number" min="100" max="250" />
              <InputField label="Weight (kg)" name="weight" type="number" min="30" max="200" />
              <SelectField label="Skin Color" name="skinColor" options={skinColors} />
              <SelectField label="Eye Color" name="eyeColor" options={eyeColors} />
              <SelectField label="Hair Color" name="hairColor" options={hairColors} />
            </div>

            <div className="relative my-8 text-center">
              <hr className="border-t border-purple-300" />
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-xs font-medium text-purple-600 uppercase">
                Your Partner Preferences
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Preferred Height (cm)" name="partnerHeight" type="number" min="100" max="250" />
              <InputField label="Preferred Weight (kg)" name="partnerWeight" type="number" min="30" max="200" />
              <SelectField label="Preferred Skin Color" name="partnerSkinColor" options={skinColors} />
              <SelectField label="Preferred Eye Color" name="partnerEyeColor" options={eyeColors} />
              <SelectField label="Preferred Hair Color" name="partnerHairColor" options={hairColors} />
            </div>

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

export default PhysicalAppearance;
