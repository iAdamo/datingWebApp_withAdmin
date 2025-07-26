import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const PasswordResetSuccess = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // ✅ Navigation Hook
  useEffect(() => {
    AOS.init({ duration: 800, once: true});
  }, []);

  if (!isOpen) return null; // Prevent rendering when modal is not open

  // ✅ Redirects to Login Page
  const handleLoginRedirect = () => {
    onClose();
    navigate("/login"); // ✅ Takes user to Login Page
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-60 z-50 bg-black/30 backdrop-blur-sm">
      <div data-aos="fade-up"
    data-aos-delay="100"
   data-aos-offset="150"
   data-aos-duration="1000"
   data-aos-easing="ease-in-out" className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full relative">
        
        {/* Close Button - Inside Modal */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-700 hover:text-red-700"
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto">
            <FontAwesomeIcon icon={faCheckCircle} className="text-purple-500 text-xl" />
          </div>
          <div data-aos="slide-right" data-aos-delay="200" className='hover:scale-105 transition'>
          <h2 className="text-xl font-semibold mt-3">Password Reset</h2>
          <p className="text-gray-600 text-sm mt-1">
            Your password has been successfully reset. Click below to log in.
          </p>
          </div>

          {/* Redirect to Login Button */}
          <Button 
            text="Login" 
            fullWidth 
            onClick={handleLoginRedirect} // ✅ Redirects to Login Page
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
