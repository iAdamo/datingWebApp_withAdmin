import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch, faHeart, faUser, faBook, faGlobe,
  faMapMarkerAlt, faBolt, faLocationDot,
  faArrowRight, faCircle
} from "@fortawesome/free-solid-svg-icons";

import Navbar from "./Navbar";
import LikeProfileModal from "../ProfileSetup/LikeProfileModal";
import SearchFilterModal from "../../components/SearchFilterModal";
import ProfileModal from "../ProfileSetup/ProfileModal";
import WriteMessageModal from "../ProfileSetup/WriteMessageModal";
import HobbiesEditModal from "./HobbiesEditModal";

import {
  getPotentialMatches,
  sendLike,
  sendMessage,
  getMutualMatches,
  getUnreadMessages,
  getReports
} from "@/utils/api";


const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [likedUser, setLikedUser] = useState(null);
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [showHobbiesModal, setShowHobbiesModal] = useState(false);
  const [profiles, setProfiles] = useState([]);

  const [filters, setFilters] = useState({
    ageRanges: [],
    maritalStatus: [],
    religion: [],
    location: []
  });

  useEffect(() => {
  AOS.init({ duration: 800, once: true });

  getPotentialMatches()
    .then(data => {
      setProfiles(data || []);
    })
    .catch(error => {
      console.error("Error fetching potential matches:", error.message);
    });
}, []);


  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      const list = prev[type];
      return {
        ...prev,
        [type]: list.includes(value)
          ? list.filter((item) => item !== value)
          : [...list, value],
      };
    });
  };

  const ageRangeMatch = (profile) => {
    if (filters.ageRanges.length === 0) return true;
    return filters.ageRanges.some((range) => {
      const [min, max] = range.split("\u2013").map((n) => parseInt(n));
      return profile.age >= min && profile.age <= max;
    });
  };

  const filteredResults = profiles.filter((profile) => {
    return (
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      ageRangeMatch(profile) &&
      (filters.religion.length === 0 || filters.religion.includes(profile.religion)) &&
      (filters.location.length === 0 || filters.location.includes(profile.location)) &&
      (filters.maritalStatus.length === 0 || filters.maritalStatus.includes(profile.maritalStatus)) &&
      (selectedHobbies.length === 0 || selectedHobbies.some(h => profile.hobbies.includes(h)))
    );
  });

  const handleLike = async (profile) => {
    try {
      await sendLike(profile.id);
      setLikedUser(profile);
      setShowLikeModal(true);
    } catch {
      alert("Failed to like profile.");
    }
  };

  const handleSendMessage = async (receiverId, message) => {
  try {
    await sendMessage(receiverId, message);
    alert("✅ Message sent successfully!");
    setShowMessageModal(false);
  } catch (error) {
    alert("❌ Failed to send message: " + error.message);
  }
};


  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div data-aos="slide-right" data-aos-delay="500" className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center border border-gray-300 bg-white rounded-full px-4 py-2 w-full sm:w-64 shadow-sm">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search profiles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-none bg-transparent text-sm w-full"
              />
            </div>

            {[
              { icon: faUser, label: "Age", type: "age", action: () => setModalType("age") },
              { icon: faHeart, label: "Marital", type: "marital", action: () => setModalType("marital") },
              { icon: faGlobe, label: "Religion", type: "religion", action: () => setModalType("religion") },
              { icon: faBook, label: "Hobbies", type: "hobbies", action: () => setShowHobbiesModal(true) },
              { icon: faMapMarkerAlt, label: "Location", type: "location", action: () => setModalType("location") },
            ].map(({ icon, label, action }) => (
              <button
                key={label}
                onClick={action}
                className="flex items-center gap-1 hover:scale-103 text-sm border border-gray-300 px-4 py-2 rounded-xl bg-white hover:bg-purple-100 transition"
              >
                <FontAwesomeIcon icon={icon} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PROFILE GRID */}
      <div data-aos="fade-up" data-aos-delay="500" className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
        {filteredResults.map((profile, idx) => (
          <div key={idx} className="bg-white rounded-xl hover:scale-103 shadow-md hover:shadow-lg transition duration-300 relative overflow-hidden">
            <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs text-purple-600 font-semibold shadow-sm flex items-center gap-1">
              <FontAwesomeIcon icon={faBolt} className="text-purple-500 text-xs" />
              {profile.compatibility} COMPATIBLE
            </div>
            <img src={profile.image} alt={profile.name} className="w-full h-48 object-cover rounded-t-xl" />
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-gray-900">{profile.name}</h3>
                <p className="text-sm font-medium text-gray-600">{profile.age} YRS</p>
              </div>
              <div className="flex items-center text-sm text-gray-500 gap-2">
                <FontAwesomeIcon icon={faLocationDot} />
                {profile.location}
              </div>
              <div className="mt-2 flex gap-2">
                <span className="flex items-center gap-1 text-xs bg-white text-green-700 px-3 py-1 border border-gray-300 rounded-full font-semibold uppercase">
                  <FontAwesomeIcon icon={faCircle} className="text-green-400 text-[10px]" />
                  {profile.religion}
                </span>
              </div>
              <button
                onClick={() => setSelectedProfile(profile)}
                className="w-full mt-4 bg-[#7d52f4] hover:bg-purple-700 text-white text-sm py-2 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-300"
              >
                View Profile <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FILTER MODALS */}
      <SearchFilterModal isOpen={modalType === "age"} onClose={() => setModalType(null)} title="Age">
        <div className="grid grid-cols-3 gap-2 px-4 py-4 text-sm font-semibold">
          {["18–20", "20–25", "25–35", "35–50", "50–60"].map((range) => (
            <label key={range} className="border border-gray-300 rounded-lg px-4 py-2 bg-white cursor-pointer hover:bg-purple-100">
              {range}
              <input type="checkbox" className="ml-2" checked={filters.ageRanges.includes(range)} onChange={() => toggleFilter("ageRanges", range)} />
            </label>
          ))}
        </div>
      </SearchFilterModal>

      <SearchFilterModal isOpen={modalType === "marital"} onClose={() => setModalType(null)} title="Marital">
        <div className="grid grid-cols-3 gap-2 px-4 py-4 text-sm font-semibold">
          {["Married", "Single", "Divorced"].map((m) => (
            <label key={m} className="border border-gray-300 rounded-lg px-4 py-2 bg-white cursor-pointer hover:bg-purple-100">
              {m}
              <input type="checkbox" className="ml-2" checked={filters.maritalStatus.includes(m)} onChange={() => toggleFilter("maritalStatus", m)} />
            </label>
          ))}
        </div>
      </SearchFilterModal>

      <SearchFilterModal isOpen={modalType === "religion"} onClose={() => setModalType(null)} title="Religion">
        <div className="grid grid-cols-3 gap-2 px-4 py-4 text-sm font-semibold">
          {["Muslim", "Christian", "Others"].map((r) => (
            <label key={r} className="border border-gray-300 rounded-lg px-4 py-2 bg-white cursor-pointer hover:bg-purple-100">
              {r}
              <input type="checkbox" className="ml-2" checked={filters.religion.includes(r)} onChange={() => toggleFilter("religion", r)} />
            </label>
          ))}
        </div>
      </SearchFilterModal>

      <SearchFilterModal isOpen={modalType === "location"} onClose={() => setModalType(null)} title="Location">
        <div className="grid grid-cols-2 gap-2 px-4 py-4 text-sm font-semibold">
          {["Dubai", "Abu-Dhabi"].map((l) => (
            <label key={l} className="border border-gray-300 rounded-lg px-4 py-2 bg-white cursor-pointer hover:bg-purple-100">
              {l}
              <input type="checkbox" className="ml-2" checked={filters.location.includes(l)} onChange={() => toggleFilter("location", l)} />
            </label>
          ))}
        </div>
      </SearchFilterModal>

      {/* PROFILE MODALS */}
      <ProfileModal
        isOpen={selectedProfile !== null}
        onClose={() => setSelectedProfile(null)}
        profile={selectedProfile}
        onLike={handleLike}
      />
      <LikeProfileModal
        isOpen={showLikeModal}
        likedName={likedUser?.name}
        profileImage={likedUser?.image}
        onClose={() => setShowLikeModal(false)}
        onSendMessage={() => setShowMessageModal(true)}
      />
     <WriteMessageModal
      isOpen={showMessageModal}
      onClose={() => setShowMessageModal(false)}
      likedName={likedUser?.name}
      profileImage={likedUser?.image}
      receiverId={likedUser?.id}
      onSend={handleSendMessage}
    />


      {showHobbiesModal && (
        <HobbiesEditModal
          selectedHobbies={selectedHobbies}
          setSelectedHobbies={setSelectedHobbies}
          onClose={() => setShowHobbiesModal(false)}
        />
      )}
    </div>
  );
};

export default Search;
