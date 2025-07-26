import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import ProgressHeader from '../../components/ProgressHeader';

const PersonalInfo = ({ nextStep }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, gender, dateOfBirth } = formData;

    if (!firstName || !lastName || !gender || !dateOfBirth) {
      alert('All fields are required.');
      return;
    }

    const isValidDate = !isNaN(new Date(dateOfBirth).getTime());
    const formattedDOB = isValidDate
      ? new Date(dateOfBirth).toISOString().split('T')[0]
      : '';

    // Send cleaned + renamed field to match backend expectations
    const cleanedData = {
       firstName,
      lastName,
      gender,
      dob: formattedDOB,
    };

    console.log("✅ Sending cleaned personal info:", cleanedData);
    nextStep(cleanedData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <ProgressHeader step={1} />

      <div
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-offset="150"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        className="flex-1 flex items-center justify-center py-12 px-4"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md space-y-6"
          autoComplete="off"
        >
          <h2 className="text-3xl font-bold hover:text-purple-500 text-center text-black">
            Create your Account
          </h2>

          <div data-aos="slide-right" data-aos-delay="200" className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                What is your First Name? *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
                autoComplete="off"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-400 transition"
              />
            </div>
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                How about your Last Name? *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
                autoComplete="off"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-400 transition"
              />
            </div>
          </div>

          <div data-aos="slide-right" data-aos-delay="200">
            <label className="text-sm font-medium text-gray-700 mb-2 block">How old are you? *</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-400 transition"
            />
          </div>

          <div data-aos="slide-right" data-aos-delay="200">
            <label className="text-sm font-medium text-gray-700 mb-2 block">What’s your gender?</label>
            <div className="flex gap-4 hover:scale-105 transition">
              {['Male', 'Female'].map((gender) => (
                <div
                  key={gender}
                  onClick={() => handleGenderSelect(gender)}
                  className={`flex items-center gap-2 border rounded-lg p-3 w-full cursor-pointer transition ${
                    formData.gender === gender
                      ? 'bg-purple-100 border-purple-500'
                      : 'border-gray-300 hover:border-purple-400'
                  }`}
                >
                  <FaUser className="text-gray-600" />
                  <span>{gender}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-1 rounded hover:scale-105 transition"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
