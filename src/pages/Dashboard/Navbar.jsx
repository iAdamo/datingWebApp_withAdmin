import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faComment,
  faUser,
  faHome,
  faBell,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchUserProfile, getActivityFeed } from "@/utils/api";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({ name: "", profilePic: "" });
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Fetch user + activity feed
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetchUserProfile();
        setUser({
          name: res.full_name || res.name || "User",
          profilePic: res.photo || "/images/default-avatar.png",
        });
      } catch (err) {
        console.error("Failed to fetch user:", err.message);
      }
    };

    const fetchActivity = async () => {
      try {
        const res = await getActivityFeed();
        setUnreadMessagesCount(res.unread_messages_count || 0);
        setUnreadNotificationsCount(res.unread_notifications_count || 0);
      } catch (err) {
        console.error("Failed to fetch activity feed:", err.message);
      }
    };

    fetchUser();
    fetchActivity();

    const interval = setInterval(fetchActivity, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navItems = [
    { icon: faHome, label: "Dashboard", route: "/dashboard" },
    { icon: faSearch, label: "Search", route: "/search" },
    { icon: faComment, label: "Messages", route: "/messages", badge: unreadMessagesCount },
    { icon: faUser, label: "Profile", route: "/profile" },
  ];

  const isActive = (route) => location.pathname === route;

  return (
    <nav
      data-aos="fade-down"
      data-aos-delay="100"
      className="bg-[#A897FF] text-white py-4 px-6 flex items-center justify-between shadow-md rounded-t-2xl relative z-50"
    >
      {/* Logo */}
      <img
        src="/images/logoo.png"
        className="w-36 h-23 cursor-pointer hover:scale-105 transition"
        alt="Logo"
        onClick={() => navigate("/dashboard")}
      />

      {/* Mobile Toggle */}
      <div className="md:hidden">
        <FontAwesomeIcon
          icon={isMobileMenuOpen ? faTimes : faBars}
          className="text-2xl cursor-pointer"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        />
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex space-x-6" data-aos="slide-left" data-aos-delay="300">
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.route)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer transition 
              ${isActive(item.route)
                ? "bg-[#8C71F6] font-semibold scale-105"
                : "hover:bg-[#8C71F6] hover:scale-103"
              }`}
          >
            <FontAwesomeIcon icon={item.icon} className="text-base" />
            <span className="text-sm font-light">{item.label}</span>
            {item.badge > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-2 py-[1px] rounded-full">
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Notification & Profile */}
      <div className="flex items-center space-x-4 relative" ref={menuRef}>
        {/* Bell with badge */}
        <div className="relative cursor-pointer" onClick={() => navigate("/notifications")}>
          <FontAwesomeIcon icon={faBell} className="text-lg hover:text-white/80 transition" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-2 py-[1px] rounded-full">
              {unreadNotificationsCount}
            </span>
          )}
        </div>

        {/* Profile */}
        <div onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 cursor-pointer">
          <img
            src={user.profilePic}
            className="w-8 h-8 rounded-full border hover:opacity-90 transition"
            alt="Profile"
          />
          <span className="text-sm font-medium">{user.name}</span>
        </div>

        {/* Dropdown */}
        {menuOpen && (
          <div className="absolute right-0 top-14 w-48 bg-white rounded-lg shadow-lg z-50 text-sm text-gray-800">
            <ul className="divide-y divide-gray-200">
              <li>
                <button className="w-full text-left px-4 py-3 hover:bg-gray-100" onClick={() => {
                  navigate("/shortlisted");
                  setMenuOpen(false);
                }}>Shortlisted Profiles</button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 hover:bg-gray-100" onClick={() => {
                  navigate("/settings");
                  setMenuOpen(false);
                }}>Settings</button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 hover:bg-gray-100">Help Center</button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-100" onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                  setMenuOpen(false);
                }}>Log Out</button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-[#A897FF] text-white p-4 flex flex-col items-center gap-4 md:hidden z-40">
          {navItems.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(item.route);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-center py-2 rounded-md transition ${
                isActive(item.route)
                  ? "bg-[#8C71F6] font-semibold"
                  : "hover:bg-[#8C71F6]"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="mr-2" />
              {item.label}
              {item.badge > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-[1px] rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
