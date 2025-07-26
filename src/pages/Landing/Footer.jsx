import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from "react";
import { FaWhatsapp, FaTelegramPlane, FaEnvelope } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
   useEffect(() => {
      AOS.init({ duration: 800, once: true });
    }, []);

  return (
    <footer data-aos="fade-up"
    data-aos-delay="200"
   data-aos-offset="150"
   data-aos-duration="1000"
   data-aos-easing="ease-in-out" className="bg-[#0A041A] text-white px-6 sm:px-10 lg:px-20 py-12">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
        {/* Left Section */}
        <div className="flex-1 space-y-4">
          <img src="/images/logoo.png" alt="Milkha Logo" className="h-30 w-auto hover:scale-140 transition" />
          <p className="text-sm leading-relaxed text-gray-300 max-w-xs hover:scale-110">
            Finding meaningful connections based on shared values and interests.
          </p>

          <div className="flex gap-3 mt-4">
            <a href="#" className="group">
              <FaWhatsapp className="text-white group-hover:text-green-400
               transition border border-[#693EE0] rounded-full w-8 h-8 p-1.5
               hover:scale-140" />
            </a>
            <a href="#" className="group">
              <FaTelegramPlane className="text-white group-hover:text-blue-400
               transition border border-[#693EE0] rounded-full w-8 h-8 p-1.5
               hover:scale-140" />
            </a>
            <a href="mailto:hello@milkha.com" className="group">
              <FaEnvelope className="text-white group-hover:text-red-400
               transition border border-[#693EE0] rounded-full w-8 h-8 p-1.5
               hover:scale-140" />
            </a>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex-1 space-y-6">
          <nav className="flex flex-wrap gap-x-3 gap-y-2 text-sm text-gray-300">
            <Link to="/" className="hover:text-purple-400 transition hover:scale-120">Home</Link>
            <span>/</span>
            <Link to="/about" className="hover:text-purple-400 transition hover:scale-120">About</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-purple-400 transition hover:scale-120">Blog</Link>
            <span>/</span>
            <Link to="/privacy-policy" className="hover:text-purple-400 transition hover:scale-120">Privacy Policy</Link>
            <span>/</span>
            <Link to="/terms" className="hover:text-purple-400 transition hover:scale-120">Terms</Link>
          </nav>

          <div>
            <p className="text-xs text-[#9091FBDE]">Email</p>
            <p className="text-sm text-gray-300 hover:scale-115">hello@milkha.com</p>
          </div>

          <p className="text-center lg:text-left text-xs text-[#9091FBDE] mt-25">
            © 2025 — Milkha Dating App. All rights reserved.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex justify-start lg:justify-end">
          <button
            onClick={() => navigate("/sign-up")}
            className="bg-[#9091FBDE] hover:bg-white text-white px-6 py-2
             rounded-md hover:scale-105 hover:shadow-lg transition-all duration-200
              hover:text-gray-800"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/admin/login")}
            className="bg-[#9091FBDE] hover:bg-white text-white px-6 py-2
             rounded-md hover:scale-105 hover:shadow-lg transition-all duration-200
              hover:text-gray-800"
          >
            Admin
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
