import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { getProfileStatus, getActivityFeed, fetchUserProfile } from '@/utils/api';

const ProfileCompletion = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activityFeed, setActivityFeed] = useState([]);
  const [enhancements, setEnhancements] = useState([]);
  const [completionPercent, setCompletionPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchData = async () => {
      try {
        const [activityData, statusData, profileData] = await Promise.all([
          getActivityFeed(),
          getProfileStatus(),
          fetchUserProfile(),
        ]);

        setActivityFeed(activityData || []);
        setEnhancements(statusData?.enhancement_suggestions || []);
        setCompletionPercent(statusData?.completion_percentage || 0);
        setIsVisible(statusData?.is_visible || false);
        setProfileImage(profileData?.profile_image || "/images/icon.png");

      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, []);

  const activityMap = {
    "VIEWED": { text: "VIEWED YOUR PROFILE", type: "blue" },
    "LIKED": { text: "LIKED YOUR PHOTO", type: "red" },
    "SHORTLISTED": { text: "ADDED YOU TO THEIR SHORTLIST", type: "blue" },
  };

  return (
    <div data-aos="fade-up" className="grid grid-cols-1 lg:grid-cols-[1.3fr_2fr] gap-6 px-6 py-6">

      {/* Profile Activity Feed */}
      <div className="bg-white p-6 rounded-lg hover:scale-104 transition shadow-md">
        <div className="flex justify-between items-center pb-0">
          <h2 className="text-lg font-bold hover:text-[#7d52f4] hover:scale-102 transition flex items-start">
            Profile Activity Feed
          </h2>
          {searchVisible && (
            <input
              type="text"
              placeholder="Search activity..."
              className="mt-0 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
          <FontAwesomeIcon
            icon={faSearch}
            className="text-gray-400 text-lg cursor-pointer"
            onClick={() => setSearchVisible(prev => !prev)}
          />
        </div>

        <div className="mt-4 space-y-4">
          {activityFeed
            .filter(activity =>
              (activity.actor_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
              (activity.activity_type || "").toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((activity, index) => {
              const { text, type } = activityMap[activity.activity_type] || {};
              return (
                <div key={index} className="flex justify-between items-center bg-gray-50 hover:scale-104 rounded-lg px-3 py-2 hover:bg-gray-200 transition-transform">
                  <div className="flex items-center space-x-3">
                    <img src="/images/frame.png" alt="User" className="w-10 h-10 rounded-full object-cover" />
                    <span className="font-medium text-xs">{activity.actor_name || "User"}</span>
                    <span className="bg-[#cac0ff] text-purple-700 text-xs px-2 py-1 rounded-full">{completionPercent}%</span>
                  </div>
                  <span className={`text-xs font-medium ${type === "blue" ? "text-blue-500" : "text-red-500"}`}>
                    {text || activity.activity_type}
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      {/* Profile Completion & Enhancements */}
      <div className="p-[1px] rounded-lg hover:scale-102 transition bg-gradient-to-r from-[#693EE0] to-[#FF68B3]">
        <div className="bg-white p-9 rounded-lg shadow-md flex flex-col lg:flex-row items-center justify-between">
          <div className="flex flex-col items-center mb-6 lg:mb-0">
            <div className="relative w-44 h-44">
              <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="stroke-gray-300" strokeWidth="8" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-current text-[#6A3FE1]"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="282.74"
                  strokeDashoffset={(100 - completionPercent) / 100 * 282.74}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <img
                src={profileImage}
                alt="Profile"
                className="absolute hover:scale-103 transition top-5 left-5 w-35 h-35 rounded-full object-cover"
              />
            </div>
            <h3 className="text-sm font-bold mt-3">{completionPercent}% Complete</h3>
            <p className="text-black text-sm font-semibold text-center">
              Your Profile is {isVisible ? "visible" : "hidden"}.
            </p>
            {!isVisible && (
              <p className="text-gray-500 text-sm text-center">
                Complete up to 70% to make it visible to others.
              </p>
            )}
          </div>

          {/* Enhancement Suggestions */}
          <div className="mt-6 w-full">
            <h2 className="text-lg font-bold hover:text-[#7D52f4] hover:scale-102 transition flex items-center mb-4">
              <FontAwesomeIcon icon={faUser} className="text-white mr-2 rounded-full px-3 py-3 bg-[#7D52F4]" />
              Profile Enhancement Suggestions
            </h2>
            <div className="space-y-3">
              {enhancements.map((s, index) => (
                <div key={index} className="flex justify-between hover:scale-103 items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-transform">
                  <div>
                    <h3 className="font-medium m-1 text-xs">
                      {s.title}
                      <span className="bg-[#cac0ff] text-purple-700 text-xs px-2 py-1 rounded-full ml-5">{s.points || '50'} POINTS</span>
                    </h3>
                    <p className="text-gray-700 font-semibold text-xs">{s.description}</p>
                  </div>
                  <FontAwesomeIcon icon={faGreaterThan} className="text-gray-400 text-xs" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfileCompletion;
