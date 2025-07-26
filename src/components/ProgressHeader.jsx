import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const ProgressHeader = ({ step }) => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 800, once: true});
  }, []);

  const steps = [
    { id: 1, name: "Create Account" },
    { id: 2, name: "Profile and Preferences" },
    { id: 3, name: "Bio" },
    { id: 4, name: "Profile Image" },
  ];

  return (
    <div data-aos="slide-down"
    data-aos-delay="100"
   data-aos-offset="150"
   data-aos-duration="1000"
   data-aos-easing="ease-in-out" className="w-full bg-[#A897FF] text-white py-0 px-0 sm:px-8 md:px-10 rounded-b-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src="/images/logoo.png"
            alt="Logo"
            onClick={() => navigate("/dashboard")}
            className="w-20 h-20 sm:w-28 md:w-36 cursor-pointer hover:scale-105 transition duration-300"
          />
        </div>

        {/* Progress Bar */}
        <div data-aos="slide-left" data-aos-delay="500" className="flex-1 flex justify-center hover:scale-105 transition">
          {/* Full progress bar for medium+ screens */}
          <div className="hidden md:flex items-center gap-6 flex-wrap justify-center text-sm">
            {steps.map((item, index) => {
              const isActive = step === item.id;
              const isCompleted = step > item.id;

              return (
                <div key={item.id} className="flex items-center gap-2 group">
                  <div
                    className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold transition duration-300
                      ${isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                        ? "bg-white text-purple-600 shadow-md hover:bg-purple-100"
                        : "bg-white/40 text-white border border-white"
                      }`}
                  >
                    {isCompleted ? "✔" : item.id}
                  </div>
                  <span
                    className={`transition duration-300 whitespace-nowrap ${
                      isActive || isCompleted ? "text-white font-semibold" : "text-white/70"
                    }`}
                  >
                    {item.name}
                  </span>
                  {index < steps.length - 1 && (
                    <span className="text-white font-semibold hidden sm:inline">›</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Condensed version for small screens */}
          <div className="flex md:hidden items-center gap-2 text-sm">
            <div
              className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold transition duration-300
                bg-white text-purple-600 shadow-md hover:bg-purple-100`}
            >
              {step}
            </div>
            <span className="text-white font-semibold">{steps[step - 1]?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;
