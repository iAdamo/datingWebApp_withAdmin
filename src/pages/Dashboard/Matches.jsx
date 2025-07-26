import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ProfileModal from "../ProfileSetup/ProfileModal";
import LikeProfileModal from "../ProfileSetup/LikeProfileModal";
import WriteMessageModal from "../ProfileSetup/WriteMessageModal";

// ✅ Import the specific API utilities
import { 
  getMatchesToday, 
  fetchShortlisted, 
  sendLike, 
  sendMessage 
} from "@/utils/api";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [shortlistedProfiles, setShortlistedProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchMatches();
    fetchShortlistedProfiles();
  }, []);

  const fetchMatches = async () => {
    try {
      const data = await getMatchesToday();
      setMatches(data);
    } catch (error) {
      console.error("❌ Error fetching today's matches:", error.message);
    }
  };

  const fetchShortlistedProfiles = async () => {
    try {
      const data = await fetchShortlisted();
      setShortlistedProfiles(data);
    } catch (error) {
      console.error("❌ Error fetching shortlisted profiles:", error.message);
    }
  };

  const handleLike = async (profile) => {
    try {
      await sendLike(profile.id);
      setSelectedProfile(profile);
      setShowLikeModal(true);
    } catch (error) {
      console.error("❌ Error liking profile:", error.message);
    }
  };

  const handleSendMessage = async (profile, messageText) => {
    try {
      await sendMessage(profile.id, messageText);
      setShowMessageModal(false);
    } catch (error) {
      console.error("❌ Error sending message:", error.message);
    }
  };

  const filteredProfiles = shortlistedProfiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 px-10 py-6">
      {/* ✅ Today's Matches Section */}
      <div
        data-aos="slide-right"
        className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1"
      >
        <h2 className="text-lg hover:scale-102 hover:text-[#7d52f4] transition font-bold">Today's Matches</h2>
        <p className="text-gray-600 text-sm">Based on your preferences</p>

        <div data-aos="flip-left" className="relative mt-4">
          <div className="overflow-x-auto scrollbar-hide" style={{ maxWidth: "100%" }}>
            <div className="flex space-x-4 w-max">
              {matches.map((match, index) => (
                <div
                  key={index}
                  className="w-56 bg-white shadow-md rounded-lg overflow-hidden flex-shrink-0 hover:scale-105 transition-transform"
                >
                  <div className="relative">
                    <img src={match.image} alt={match.name} className="w-full h-48 object-cover" />
                    <span className="absolute top-2 right-2 bg-[#7D52f4] text-white text-xs px-2 py-1 rounded-full">
                      {match.matchPercentage || match.compatibility || "N/A"} MATCH
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{match.name}</h3>
                    <p className="text-gray-500 text-sm">{match.age}</p>
                    <p className="text-gray-500 text-sm">{match.location}</p>
                    <button
                      onClick={() => setSelectedProfile(match)}
                      className="mt-3 w-full bg-[#7D52f4] text-white text-sm py-2 rounded-lg hover:bg-purple-900"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Shortlisted Profiles Section */}
      <div data-aos="slide-left" className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-lg hover:scale-103 transition hover:text-[#a897ff] font-bold">
            Shortlisted Profiles
          </h2>
          <FontAwesomeIcon
            icon={faSearch}
            className="text-gray-400 text-lg hover:scale-105 cursor-pointer"
            onClick={() => setSearchVisible((prev) => !prev)}
          />
        </div>

        {searchVisible && (
          <input
            type="text"
            placeholder="Search profile..."
            className="mt-4 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        )}

        <div data-aos="flip-up" className="mt-4 space-y-4">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile, index) => (
              <div
                key={index}
                className="flex justify-between hover:scale-105 items-center bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{profile.name}</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedProfile(profile);
                    setShowMessageModal(true);
                  }}
                  className="text-blue-500 text-sm font-semibold hover:underline"
                >
                  SEND A MESSAGE
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 mt-3">No matches found.</p>
          )}
        </div>
      </div>

      {/* ✅ Profile Modal */}
      <ProfileModal
        isOpen={selectedProfile !== null}
        onClose={() => setSelectedProfile(null)}
        profile={selectedProfile}
        onLike={(profile) => handleLike(profile)}
      />

      {/* ✅ Like Profile Modal */}
      <LikeProfileModal
        isOpen={showLikeModal}
        onClose={() => setShowLikeModal(false)}
        likedName={selectedProfile?.name}
        profileImage={selectedProfile?.image}
        onSendMessage={() => {
          setShowLikeModal(false);
          setShowMessageModal(true);
        }}
      />

      {/* ✅ Write Message Modal */}
      <WriteMessageModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        likedName={selectedProfile?.name}
        profileImage={selectedProfile?.image}
        onSendMessage={(messageText) =>
          handleSendMessage(selectedProfile, messageText)
        }
      />
    </div>
  );
};

export default Matches;
