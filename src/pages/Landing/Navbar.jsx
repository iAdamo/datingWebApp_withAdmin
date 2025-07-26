import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(()=> {
    AOS.init({ duration: 800, once: true});
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Blog", path: "/blog" },
    { label: "About", path: "/about" },
    { label: "Pricing", path: "/pricing" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav data-aos="fade-down" data-aos-delay="200" className="w-full absolute top-0 left-0 z-50 bg-purple-200 text-purple-800 px-6 h-12 sm:px-10 py-4 flex justify-between items-center">
      {/* Logo */}
      <div
        className="flex items-center hover:scale-105 transition cursor-pointer"
        onClick={() => navigate("/login")}
      >
        <img src="/images/logoo.png" alt="Milkha Logo" className="h-23 w-33 mr-2" />
        <span className="text-lg font-bold italic"></span>
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex space-x-6 text-md font-medium">
        {navItems.map(({ label, path }) => (
          <li
            key={label}
            onClick={() => navigate(path)}
            className="hover:text-purple-900 hover:bg-white px-2 py-1 rounded hover:scale-103 transition cursor-pointer"
          >
            {label}
          </li>
        ))}
      </ul>

      {/* Login / Signup Desktop */}
      <div className="hidden md:flex space-x-3">
        <button
          onClick={() => navigate("/login")}
          className="text-purple-800 border border-b-purple-800 px-4 py-1 text-sm rounded hover:bg-white hover:text-black transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/sign-up")}
          className="bg-purple-600 text-white px-4 py-1 text-sm rounded hover:bg-purple-700 transition"
        >
          Sign Up
        </button>
      </div>

      {/* Hamburger Icon */}
      <div className="md:hidden text-xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-[#A897FF] text-white
         transition py-6 px-4 rounded-b-xl shadow-lg  z-50 md:hidden">
          <ul className="flex flex-col space-y-4">
            {navItems.map(({ label, path }) => (
              <li
                key={label}
                onClick={() => {
                  navigate(path);
                  setIsOpen(false);
                }}
                className="text-md font-medium hover:text-purple-300"
              >
                {label}
              </li>
            ))}
            <hr className="my-2 border-purple-300" />
            <li
              onClick={() => {
                navigate("/login");
                setIsOpen(false);
              }}
              className="text-sm font-medium hover:text-purple-300"
            >
              Login
            </li>
            <li
              onClick={() => {
                navigate("/sign-up");
                setIsOpen(false);
              }}
              className="text-sm font-medium hover:text-purple-300"
            >
              Sign Up
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
