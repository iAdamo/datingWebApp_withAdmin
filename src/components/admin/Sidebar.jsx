import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect  } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  faTableColumns,
  faFlag,
  faUsers,
  faGear,
  faArrowRightFromBracket,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    AOS.init({ duration: 800, once: true});
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Toggle Button - Only on small screens */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 text-white bg-purple-600 p-2 rounded-md shadow-md"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Blurred Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside data-aos="fade-right"
    data-aos-delay="100"
   data-aos-offset="150"
   data-aos-duration="1000"
   data-aos-easing="ease-in-out"
        className={`fixed top-0 left-0 h-auto bg-[#53389E] text-white z-50 w-64 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:flex lg:min-h-screen flex-col justify-between px-6 py-8`}
      >
        {/* Top Section - Logo & Nav */}
        <div>
          {/* Logo */}
          <div data-aos="fade-down" data-aos-delay="200" className="flex justify-center hover:scale-105 transition mb-5 cursor-pointer">
            <img
              src="/images/logoo.png"
              alt="Perfect Match"
              className="w-auto h-30"
              onClick={() => {
                navigate("/dashboard");
                closeSidebar();
              }}
            />
          </div>

          {/* Navigation Links */}
          <nav data-aos="flip-up" data-aos-delay="50" className="space-y-4 text-sm font-medium">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center hover:scale-105 gap-3 px-2 py-2 rounded-md transition ${
                  isActive ? "bg-[#6941C6] text-white" : "hover:bg-[#6941C6]"
                }`
              }
              onClick={closeSidebar}
            >
              <FontAwesomeIcon icon={faTableColumns} />
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/reports"
              className={({ isActive }) =>
                `flex items-center justify-between hover:scale-105 px-2 py-2 rounded-md transition ${
                  isActive ? "bg-[#6941C6] text-white" : "hover:bg-[#6941C6]"
                }`
              }
              onClick={closeSidebar}
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faFlag} />
                Report Management
              </div>
              <span className="bg-white text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">
                10
              </span>
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center hover:scale-105 gap-3 px-2 py-2 rounded-md transition ${
                  isActive ? "bg-[#6941C6] text-white" : "hover:bg-[#6941C6]"
                }`
              }
              onClick={closeSidebar}
            >
              <FontAwesomeIcon icon={faUsers} />
              User Management
            </NavLink>

            <NavLink
              to="/admin/profile"
              className={({ isActive }) =>
                `flex items-center hover:scale-105 gap-3 px-2 py-2 rounded-md transition ${
                  isActive ? "bg-[#6941C6] text-white" : "hover:bg-[#6941C6]"
                }`
              }
              onClick={closeSidebar}
            >
              <FontAwesomeIcon icon={faGear} />
              Settings
            </NavLink>
          </nav>
        </div>

        {/* Bottom - User Info & Logout */}
        <div className="border-t border-white/20 pt-4">
          <div className="flex hover:scale-105 transition items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white text-purple-700 w-8 h-8 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div>
                <p className="text-sm font-semibold">Olivia Rhye</p>
                <p className="text-xs text-white/70">olivia@milkha.com</p>
              </div>
            </div>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="text-white hover:text-red-300 hover:scale-105 transition cursor-pointer"
              title="Logout"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/admin/login";
              }}
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
