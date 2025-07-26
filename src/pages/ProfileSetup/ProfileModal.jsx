import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faHeart,
  faBolt,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

// ✅ Correct imports from your utils/api
import { fetchUserProfile, sendLike, sendShortlist } from "@/utils/api";

const ProfileModal = ({ isOpen, onClose, profile: initialProfile, onLike }) => {
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingShortlist, setLoadingShortlist] = useState(false);

  const [showBioModal, setShowBioModal] = useState(true);
  const [showHobbies, setShowHobbies] = useState(true);
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  const [showLookingFor, setShowLookingFor] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    const fetchFullProfile = async () => {
      if (!initialProfile?.id || !isOpen) return;

      try {
        setLoadingProfile(true);
        const data = await fetchUserProfile(); // ✅ Replaced axios with your utility
        setProfile(data); // Assumes it returns the correct profile
      } catch (error) {
        toast.error("Failed to load full profile.");
        setProfile(initialProfile); // Fallback to partial data
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchFullProfile();
  }, [initialProfile, isOpen]);

  const handleLike = async () => {
    try {
      setLoadingLike(true);
      await sendLike(profile.id); // ✅
      toast.success(`You liked ${profile.name}`);
      if (onLike) onLike(profile);
    } catch {
      toast.error("Failed to like profile.");
    } finally {
      setLoadingLike(false);
    }
  };

  const handleShortlist = async () => {
    try {
      setLoadingShortlist(true);
      await sendShortlist(profile.id); // ✅
      toast.success(`${profile.name} shortlisted`);
    } catch {
      toast.error("Failed to shortlist profile.");
    } finally {
      setLoadingShortlist(false);
    }
  };

  if (!isOpen || !initialProfile) return null;

  if (loadingProfile || !profile) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center text-gray-700 text-sm">Loading Profile...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/30 backdrop-blur-sm">
      <div data-aos="slide-left" className="w-full sm:max-w-xl bg-[#F9F9FC] rounded-l-3xl h-full overflow-y-auto animate-slide-in-right shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>

        <div className="p-6 pb-10">
          {/* Profile Image */}
          <div className="relative w-fit mx-auto mb-6">
            <div className="absolute top-[-6px] left-[8px] w-full h-full bg-gray-200 rounded-3xl rotate-1 scale-[0.98] z-0" />
            <img
              src={profile.image || "/images/avatar-placeholder.png"}
              alt={profile.name}
              className="relative z-10 w-64 rounded-3xl shadow-xl object-cover transition-transform duration-500 hover:scale-105"
            />
            <span className="absolute top-2 right-2 bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1 shadow-sm">
              <FontAwesomeIcon icon={faBolt} className="text-[10px]" />
              {profile.compatibility || "N/A"} COMPATIBLE
            </span>
          </div>

          {/* Name and Actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 px-2">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
              <p className="text-sm text-gray-500 font-medium mt-1">
                {profile.age} YRS <span className="mx-1">|</span> {profile.location}
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleLike}
                disabled={loadingLike}
                className="bg-pink-50 hover:bg-white text-pink-600 px-5 py-2 rounded-full font-medium text-sm border border-pink-200 transition flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faHeart} />
                {loadingLike ? "Liking..." : "Like"}
              </button>
              <button
                onClick={handleShortlist}
                disabled={loadingShortlist}
                className="bg-purple-50 hover:bg-white text-purple-600 px-5 py-2 rounded-full font-medium text-sm border border-purple-200 transition flex items-center gap-2"
              >
                ⭐ {loadingShortlist ? "Shortlisting..." : "Shortlist"}
              </button>
            </div>
          </div>

          {/* Bio Section */}
          <div className="space-y-4 text-sm text-gray-800">
            <div className="bg-[#F1EDFF] rounded-xl p-4 shadow-md border border-gray-100 hover:scale-103 transition">
              <div
                className="flex justify-between items-center text-xs font-semibold text-gray-500 uppercase mb-2 cursor-pointer"
                onClick={() => setShowBioModal(!showBioModal)}
              >
                <span>About {profile.name?.split(" ")[0]}</span>
                <FontAwesomeIcon icon={showBioModal ? faChevronUp : faChevronDown} />
              </div>
              {showBioModal && (
                <p className="text-gray-700">{profile.bio || "No bio provided."}</p>
              )}
            </div>

            {/* Hobbies Section */}
            {Array.isArray(profile.hobbies) && (
              <div className="bg-[#F1EDFF] rounded-xl p-4 shadow-md border border-gray-100 hover:scale-103 transition">
                <div
                  className="flex justify-between items-center text-xs font-semibold text-gray-500 uppercase mb-2 cursor-pointer"
                  onClick={() => setShowHobbies(!showHobbies)}
                >
                  <span>Hobbies</span>
                  <FontAwesomeIcon icon={showHobbies ? faChevronUp : faChevronDown} />
                </div>
                {showHobbies && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.hobbies.map((hobby, idx) => (
                      <span key={idx} className="text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200">
                        ⚡ {hobby}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Personal Info */}
            <div className="bg-[#F1EDFF] rounded-xl p-4 shadow-md border border-gray-100 hover:scale-103 transition">
              <div
                className="flex justify-between items-center text-xs font-semibold text-gray-500 uppercase mb-2 cursor-pointer"
                onClick={() => setShowPersonalInfo(!showPersonalInfo)}
              >
                <span>Personal Information</span>
                <FontAwesomeIcon icon={showPersonalInfo ? faChevronUp : faChevronDown} />
              </div>
              {showPersonalInfo && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-center">
                  <div>
                    <p className="text-gray-500 font-semibold uppercase">Religion</p>
                    <p className="text-gray-800">{profile.religion || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold uppercase">Marital Status</p>
                    <p className="text-gray-800">{profile.maritalStatus || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold uppercase">Occupation</p>
                    <p className="text-gray-800">{profile.occupation || "-"}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Looking For */}
            {profile.looking && (
              <div className="bg-[#F1EDFF] rounded-xl p-4 shadow-md border border-gray-100 hover:scale-103 transition">
                <div
                  className="flex justify-between items-center text-xs font-semibold text-gray-500 uppercase mb-2 cursor-pointer"
                  onClick={() => setShowLookingFor(!showLookingFor)}
                >
                  <span>Looking For…</span>
                  <FontAwesomeIcon icon={showLookingFor ? faChevronUp : faChevronDown} />
                </div>
                {showLookingFor && (
                  <p className="text-gray-700">{profile.looking}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
