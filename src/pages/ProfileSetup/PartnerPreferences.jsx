import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import ProgressHeader from '../../components/ProgressHeader';
import SidebarProgress from './SidebarProgress';

const PartnerPreferences = ({ nextStep, prevStep, gender, formData, updateFormData }) => {
  const [localData, setLocalData] = useState({
    maritalStatus: formData.maritalStatus || "",
    hasChildren: formData.hasChildren || "",
    country: formData.country || "",
    emirate: formData.emirate || "",
    nationality: formData.nationality || "",
    background: formData.background || "",
    partnerMaritalStatus: formData.partnerMaritalStatus || "",
    partnerHasChildren: formData.partnerHasChildren || "",
    partnerCountry: formData.partnerCountry || "",
    partnerEmirate: formData.partnerEmirate || "",
    partnerNationality: formData.partnerNationality || "",
    partnerBackground: formData.partnerBackground || "",
    ...(gender === 'Male' ? { partnerVeiled: formData.partnerVeiled || "" } : {})
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...localData, [name]: value };
    setLocalData(newData);
    if (value) setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleSelect = (field, value) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    if (value) setErrors(prev => ({ ...prev, [field]: false }));
  };

  const inputClass = (field) =>
    `border rounded text-xs p-2.5 w-full focus:outline-none transition ${
      errors[field]
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:ring-2 focus:ring-purple-500 hover:border-purple-400'
    }`;

  const selectableRadio = (field, value, label) => (
    <div
      key={value}
      onClick={() => handleSelect(field, value)}
      className={`flex justify-between items-center border rounded-md px-4 py-2 text-sm cursor-pointer w-full
        ${localData[field] === value ? 'bg-purple-100 border-purple-500' : 'bg-white border-gray-300'}
        hover:border-purple-400 transition duration-200`}
    >
      <span className="text-gray-800">{label}</span>
      <div
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
          localData[field] === value ? 'border-purple-600' : 'border-gray-300'
        }`}
      >
        {localData[field] === value && (
          <div className="w-2 h-2 bg-purple-600 rounded-full" />
        )}
      </div>
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      'maritalStatus', 'hasChildren', 'country', 'emirate', 'nationality', 'background',
      'partnerMaritalStatus', 'partnerHasChildren', 'partnerCountry', 'partnerEmirate',
      'partnerNationality', 'partnerBackground'
    ];

    if (gender === 'Male') requiredFields.push('partnerVeiled');

    const newErrors = {};
    requiredFields.forEach(field => {
      if (!localData[field]) newErrors[field] = true;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.warn("⚠️ Validation failed. Missing fields:", newErrors);
      return;
    }

    console.log("✅ Partner Preferences validated:", localData);
    updateFormData(localData);
    nextStep(localData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col rounded-b-2xl">
      <ProgressHeader step={2} />

      <div className="flex flex-col lg:flex-row gap-4 px-4 py-8">
        <SidebarProgress activeStep={1} activeSubStep={1} />

        <div
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-offset="150"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          className="flex-1 w-full max-w-[800px] mx-auto"
        >
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-md" autoComplete="off">
            <h2 className="font-bold text-purple-700 mb-6 justify-center text-center text-3xl">
              Tell us a bit about yourself
            </h2>

            {/* Self Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5" data-aos="slide-left" data-aos-delay="500">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Marital Status *</label>
                <div className={`grid grid-cols-2 gap-1 ${errors.maritalStatus ? 'border border-red-500 p-1 rounded' : ''}`}>
                  {['Divorced', 'Widowed', 'Married', 'Single'].map((opt) =>
                    selectableRadio('maritalStatus', opt, opt)
                  )}
                </div>
                {errors.maritalStatus && <p className="text-red-500 text-xs mt-1">Required</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Do you have children? *</label>
                <div className={`flex gap-2 ${errors.hasChildren ? 'border border-red-500 p-1 rounded' : ''}`}>
                  {['Yes', 'No'].map((opt) => selectableRadio('hasChildren', opt, opt))}
                </div>
                {errors.hasChildren && <p className="text-red-500 text-xs mt-1">Required</p>}
              </div>

              {['country', 'emirate', 'nationality', 'background'].map((field) => (
                <div key={field}>
                  <label className="block mb-2 text-xs font-semibold text-gray-700 capitalize">
                    {field.replace(/([A-Z])/g, ' $1')} *
                  </label>
                  {field === 'emirate' ? (
                    <select 
                      name={field} 
                      value={localData[field]} 
                      onChange={handleChange} 
                      className={inputClass(field)}
                    >
                      <option value="">Select Emirate</option>
                      {['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al-Quwain', 'Ras Alkhaimah', 'Fujairah'].map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      name={field}
                      value={localData[field] || ''}
                      onChange={handleChange}
                      className={inputClass(field)}
                      placeholder={`Enter ${field}`}
                    />
                  )}
                  {errors[field] && <p className="text-red-500 text-xs mt-1">Required</p>}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div data-aos="fade-down" data-aos-delay="500" className="my-10 relative text-center">
              <hr className="border-t border-purple-300" />
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-xs font-medium text-purple-600 uppercase">
                Your Partner Preferences
              </span>
            </div>

            {/* Partner Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5" data-aos="fade-up" data-aos-delay="500">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Preferred Partner's Marital Status *
                </label>
                <div className={`grid grid-cols-2 gap-1 ${errors.partnerMaritalStatus ? 'border border-red-500 p-1 rounded' : ''}`}>
                  {['Divorced', 'Widowed', 'Married', 'Single'].map((opt) =>
                    selectableRadio('partnerMaritalStatus', opt, opt)
                  )}
                </div>
                {errors.partnerMaritalStatus && <p className="text-red-500 text-xs mt-1">Required</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Do you prefer a partner with children? *
                </label>
                <div className={`flex gap-2 ${errors.partnerHasChildren ? 'border border-red-500 p-1 rounded' : ''}`}>
                  {['Yes', 'No'].map((opt) => selectableRadio('partnerHasChildren', opt, opt))}
                </div>
                {errors.partnerHasChildren && <p className="text-red-500 text-xs mt-1">Required</p>}
              </div>

              {gender === 'Male' && (
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Should your partner be veiled? *
                  </label>
                  <div className={`grid grid-cols-3 gap-2 ${errors.partnerVeiled ? 'border border-red-500 p-1 rounded' : ''}`}>
                    {['Yes', 'No', 'No Preference'].map((opt) => 
                      <div key={`partnerVeiled-${opt}`}>
                        {selectableRadio('partnerVeiled', opt, opt)}
                      </div>
                    )}
                  </div>
                  {errors.partnerVeiled && <p className="text-red-500 text-xs mt-1">Required</p>}
                </div>
              )}

              {['partnerCountry', 'partnerEmirate', 'partnerNationality', 'partnerBackground'].map((field) => (
                <div key={field}>
                  <label className="block mb-2 text-xs font-semibold text-gray-700 capitalize">
                    {field.replace(/([A-Z])/g, ' $1')} *
                  </label>
                  {field === 'partnerEmirate' ? (
                    <select 
                      name={field} 
                      value={localData[field]} 
                      onChange={handleChange} 
                      className={inputClass(field)}
                    >
                      <option value="">Select Partner Emirate</option>
                      {['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al-Quwain', 'Ras Alkhaimah', 'Fujairah'].map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      name={field}
                      value={localData[field] || ''}
                      onChange={handleChange}
                      placeholder={`Enter ${field.replace('partner', 'partner ')}`}
                      className={inputClass(field)}
                    />
                  )}
                  {errors[field] && <p className="text-red-500 text-xs mt-1">Required</p>}
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between bg-white mt-8 px-4 sm:px-10 py-4 border-t border-gray-300 rounded-b-2xl">
              <div className="flex w-full max-w-[800px] mx-auto flex-col sm:flex-row gap-4 justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-white w-full sm:w-[48%] border border-gray-400 text-gray-700 py-2.5 rounded hover:scale-105 hover:bg-gray-100 hover:border-purple-400 transition duration-200"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-[48%] bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2.5 rounded hover:scale-105 hover:opacity-90 hover:shadow-md transition duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartnerPreferences;
