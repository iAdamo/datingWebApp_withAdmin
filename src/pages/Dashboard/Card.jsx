import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends, faComments, faStar } from "@fortawesome/free-solid-svg-icons";
import {
  fetchUserProfile,
  getMatchesToday,
  getChatRooms,
  fetchShortlisted,
} from "@/utils/api"; // ✅ Clean API imports

const StatsCards = () => {
  const [userName, setUserName] = useState("User");
  const [matchCount, setMatchCount] = useState(0);
  const [chatCount, setChatCount] = useState(0);
  const [shortlistCount, setShortlistCount] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    // Fetch User Profile
    const loadProfile = async () => {
      try {
        const profile = await fetchUserProfile();
        setUserName(profile.full_name || "User");
      } catch (error) {
        console.error("Failed to fetch profile:", error.message);
      }
    };

    // Matches Today
    const loadMatches = async () => {
      try {
        const matches = await getMatchesToday();
        setMatchCount(matches.length);
      } catch (error) {
        console.error("Failed to fetch matches:", error.message);
      }
    };

    // Chat Rooms
    const loadChats = async () => {
      try {
        const chats = await getChatRooms();
        setChatCount(chats.length);
      } catch (error) {
        console.error("Failed to fetch chats:", error.message);
      }
    };

    // Shortlisted
    const loadShortlists = async () => {
      try {
        const shortlists = await fetchShortlisted();
        setShortlistCount(shortlists.length);
      } catch (error) {
        console.error("Failed to fetch shortlists:", error.message);
      }
    };

    loadProfile();
    loadMatches();
    loadChats();
    loadShortlists();
  }, []);

  const stats = [
    { icon: faUserFriends, title: "Matches", value: matchCount },
    { icon: faComments, title: "Active Chats", value: chatCount },
    { icon: faStar, title: "Shortlisted Profiles", value: shortlistCount },
  ];

  return (
    <div className="block px-10 py-6 pt-10">
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-offset="150"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-6 items-start"
      >
        {/* Welcome Section */}
        <div data-aos="slide-left" data-aos-delay="500">
          <h2 className="text-lg hover:scale-103 transition font-medium text-gray-600">
            Welcome back,
          </h2>
          <h2 className="text-4xl font-bold text-black mt-1 w-4x1 hover:text-[#a897ff] hover:scale-103 transition">
            {userName}
          </h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:scale-103 transition p-6 rounded-lg flex items-left space-x-4 justify-start"
            >
              <div className="bg-[#7D52f4] text-white w-10 h-10 flex items-center justify-center rounded-full">
                <FontAwesomeIcon icon={stat.icon} className="text-lg" />
              </div>

              <div>
                <p className="text-gray-600 font-semibold mt-2">{stat.title}</p>
                <h2 className="text-2xl hover:text-[#a897ff] font-bold text-start mt-3">{stat.value}</h2>
                <hr className="mt-6 border-gray-300" />
                <p className="text-xs text-gray-500 mt-1 text-start">+4.2% from previous week</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
