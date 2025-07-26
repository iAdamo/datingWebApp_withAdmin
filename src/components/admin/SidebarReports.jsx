import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGear,
  faLock,
  faUsers,
  faBell,
  faSignOutAlt,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";

const SidebarReports = () => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 800, once: true});
  }, []);
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle for small screens

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/admin/login";
  };

  return (
    <>
      {/* Toggle Button (Visible on small screens) */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-[#6B4EFF] text-white p-2 rounded-md shadow-lg md:hidden"
      >
        <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
      </button>

      {/* blurred overlay*/}
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
        className={`
          fixed top-0 left-0 z-40 h-full bg-[#6B4EFF] text-white w-64 transition-transform duration-300 ease-in-out
           shadow-lg flex flex-col justify-between
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:min-h-screen
        `}
      >
        {/* Top Section */}
        <div>
          {/* Logo */}
          <div data-aos="fade-down" data-aos-delay="200"
            className="flex justify-center hover:scale-105 transition py-6 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <img src="/images/logoo.png" alt="Logo" className="w-auto h-30" />
          </div>

          {/* Navigation */}
          <nav data-aos="flip-up" data-aos-delay="500" className="flex flex-col gap-1 px-4 text-sm font-medium">
            {[
              { to: "/admin/profile", icon: faUser, label: "My Details" },
              {
                to: "/admin/profile",
                icon: faGear,
                label: "Profile",
                badge: "10",
              },
              { to: "/admin/password", icon: faLock, label: "Password" },
              { to: "/admin/team", icon: faUsers, label: "Team" },
              { to: "/admin/billing", icon: faGear, label: "Billing" },
              { to: "/admin/notifications", icon: faBell, label: "Notifications" },
              { to: "/admin/settings", icon: faGear, label: "Settings" },
            ].map(({ to, icon, label, badge }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `flex items-center hover:scale-105 gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
                    isActive ? "bg-white/20" : "hover:bg-white/10"
                  }`
                }
              >
                <FontAwesomeIcon icon={icon} />
                {label}
                {badge && (
                  <span className="ml-auto bg-white text-[#6B4EFF] text-xs font-bold px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/30 px-4 py-4">
          <div className="flex items-center hover:scale-105 transition justify-between text-sm">
            <div>
              <p className="font-semibold">Olivia Rhye</p>
              <p className="text-white/70 text-xs">olivia@milkha.com</p>
            </div>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="text-white hover:text-red-300 hover:scale-105 transition cursor-pointer"
              onClick={logout}
              title="Logout"
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarReports;
