// src/pages/Dashboard/admin/Auth/PasswordResetSuccessPage.jsx
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/Button"; // adjust path if needed

const PasswordResetSuccessPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 800, once: true});
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 to-white px-4">
      <div data-aos="fade-up"
    data-aos-delay="100"
   data-aos-offset="150"
   data-aos-duration="1000"
   data-aos-easing="ease-in-out" className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
        <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto">
          <FontAwesomeIcon icon={faCircleCheck} className="text-purple-600 text-xl" />
        </div>
        <div data-aos="slide-down" data-aos-delay="200" className='hover:scale-105 hover:text-purple-600 transition'>
        <h2 className="text-lg font-bold mt-4">Password Reset Successful</h2>
        <p className="text-sm text-gray-600 mt-2">
          You have successfully reset your password. Please use your new password to log in.
        </p>
        </div>
        <div data-aos="slide-up" data-aos-delay="200" 
        className='w-auto hover:scale-105 transition'>
        <Button
          text="Go to Login"
          fullWidth
          className="mt-6"
          onClick={() => navigate("/admin/login")}
        />
        </div>
      </div>
    </div>
  );
};

export default PasswordResetSuccessPage;

