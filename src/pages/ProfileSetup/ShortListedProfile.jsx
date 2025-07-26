import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Dashboard/Navbar";
import { fetchShortlisted } from "@/utils/api"; // ✅ Corrected import

const Shortlisted = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadShortlisted = async () => {
      try {
        const data = await fetchShortlisted(); // ✅ Use clean utility
        setProfiles(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load shortlisted profiles.");
      } finally {
        setLoading(false);
      }
    };

    loadShortlisted();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f8fa] text-gray-800">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Shortlisted Profiles</h1>

        {/* Loading & Error Handling */}
        {loading ? (
          <p className="text-gray-500">Loading shortlisted profiles...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : profiles.length === 0 ? (
          <p className="text-gray-600">You haven’t shortlisted any profiles yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {profiles.map((profile, index) => (
              <div key={index} className="bg-white rounded-xl shadow p-4 relative">
                {/* Compatibility Badge */}
                <span className="absolute top-3 right-3 bg-white text-xs text-gray-700 px-2 py-1 rounded-full border border-gray-200 shadow-sm">
                  ⚡ {profile.compatibility || "N/A"}
                </span>

                <img
                  src={profile.image || "/images/default-profile.jpg"}
                  alt={profile.name}
                  className="rounded-md w-full h-48 object-cover"
                />
                <div className="mt-4 flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{profile.name}</h3>
                  <p className="text-sm">{profile.age ? `${profile.age} YRS` : ""}</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">{profile.location || "Unknown"}</p>

                {/* Tags */}
                <div className="flex gap-2 mt-2">
                  <span className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    {profile.religion || "Unknown"}
                  </span>
                  <span className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    {profile.ethnicity || "No Tag"}
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/profile/${profile.id}`)}
                  className="mt-4 w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-2 rounded-full text-sm font-semibold"
                >
                  View Profile →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shortlisted;
