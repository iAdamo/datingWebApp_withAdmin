import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
  faUser,
  faToggleOn,
  faToggleOff,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fetchUserProfile,
  patchUserProfile,
  patch,
} from "@/utils/api";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const Settings = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [emailUpdates, setEmailUpdates] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(false);
  const [profileLikes, setProfileLikes] = useState(true);
  const [newMatches, setNewMatches] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await fetchUserProfile();
      setProfile({
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        email: data.email || "",
      });
      setEmailUpdates(data.notifications?.email_updates ?? true);
      setSecurityAlerts(data.notifications?.security_alerts ?? false);
      setProfileLikes(data.notifications?.profile_likes ?? true);
      setNewMatches(data.notifications?.new_matches ?? false);
    } catch {
      toast.error("Failed to load profile settings");
    }
  };

  const handleSaveProfile = async () => {
    try {
      await patchUserProfile({
        first_name: profile.firstName,
        last_name: profile.lastName,
      });
      toast.success("Profile updated");
    } catch {
      toast.error("Profile update failed");
    }
  };

  const handleNotificationToggle = async (type, value) => {
    try {
      await patch("/notifications/settings/", { [type]: value });
      toast.success(`${type.replace("_", " ")} updated`);
    } catch {
      toast.error(`Failed to update ${type}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-gray-800">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* ACCOUNT INFORMATION */}
        <div className="bg-[#EFEBFF] rounded-xl p-6 mb-6 space-y-4 shadow-sm">
          <h2 className="text-sm font-semibold text-[#4C25A7]">ACCOUNT INFORMATION</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <p className="text-gray-800 font-semibold">First Name</p>
              <FontAwesomeIcon icon={faUser} className="absolute top-9 left-3 text-gray-400" />
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                className="w-full pl-10 border border-gray-300 rounded-md px-4 py-2 bg-white"
              />
            </div>
            <div className="relative">
              <p className="text-gray-800 font-semibold">Last Name</p>
              <FontAwesomeIcon icon={faUser} className="absolute top-9 left-3 text-gray-400" />
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                className="w-full pl-10 border border-gray-300 rounded-md px-4 py-2 bg-white"
              />
            </div>
          </div>
          <div className="relative">
            <p className="text-gray-800 font-semibold">Email Address</p>
            <FontAwesomeIcon icon={faEnvelope} className="absolute top-9 left-3 text-gray-400" />
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full pl-10 border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-500"
            />
          </div>
          <button
            onClick={handleSaveProfile}
            className="mt-4 bg-[#693EE0] hover:bg-purple-700 text-white px-6 py-2 rounded-md text-sm"
          >
            Save Changes
          </button>
        </div>

        {/* NOTIFICATIONS */}
        <div className="bg-[#EFEBFF] rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-sm font-semibold text-[#4C25A7] mb-4">NOTIFICATIONS</h2>
          <div className="space-y-6 text-sm">
            {[
              {
                label: "Email Updates",
                desc: "Receive product and feature announcements",
                state: emailUpdates,
                setState: setEmailUpdates,
                key: "email_updates",
              },
              {
                label: "Security Alerts",
                desc: "Be notified of account activity or login",
                state: securityAlerts,
                setState: setSecurityAlerts,
                key: "security_alerts",
              },
              {
                label: "Profile Views & Likes",
                desc: "Get notified when others interact with your profile",
                state: profileLikes,
                setState: setProfileLikes,
                key: "profile_likes",
              },
              {
                label: "New Match Alerts",
                desc: "Get notified when a match is found",
                state: newMatches,
                setState: setNewMatches,
                key: "new_matches",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                <FontAwesomeIcon
                  icon={item.state ? faToggleOn : faToggleOff}
                  className={`text-2xl cursor-pointer ${
                    item.state ? "text-[#7D52F4]" : "text-gray-400"
                  }`}
                  onClick={() => {
                    const newState = !item.state;
                    item.setState(newState);
                    handleNotificationToggle(item.key, newState);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* DELETE ACCOUNT (Optional Placeholder) */}
        <div className="bg-[#EFEBFF] rounded-xl p-6 text-center shadow-sm">
          <button className="bg-[#FB3748] hover:bg-red-600 text-white px-6 py-2 rounded-md text-sm w-full">
            🗑 Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
