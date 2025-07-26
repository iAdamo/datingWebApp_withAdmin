import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBolt } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { patchUserProfile } from "@/utils/api"; // ✅ Standardized helper

const hobbiesList = [
  { label: "Reading", color: "bg-sky-100 text-sky-600" },
  { label: "Travel", color: "bg-yellow-100 text-yellow-700" },
  { label: "Music", color: "bg-gray-200 text-gray-800" },
  { label: "Writing", color: "bg-gray-200 text-gray-800" },
  { label: "Fitness", color: "bg-purple-200 text-purple-700" },
  { label: "Painting", color: "bg-gray-200 text-gray-800" },
  { label: "Cooking", color: "bg-cyan-100 text-cyan-700" },
  { label: "Gym", color: "bg-gray-200 text-gray-800" },
  { label: "Baking", color: "bg-gray-200 text-gray-800" },
  { label: "Acting & Theatre", color: "bg-gray-200 text-gray-800" },
  { label: "Yoga & Meditation", color: "bg-gray-200 text-gray-800" },
  { label: "Swimming", color: "bg-gray-200 text-gray-800" },
  { label: "Dance (Ballet, Hip-Hop, Salsa)", color: "bg-gray-200 text-gray-800" },
  { label: "Food Blogging", color: "bg-gray-200 text-gray-800" },
  { label: "Public Speaking & Debating", color: "bg-purple-200 text-purple-700" },
  { label: "Comedy", color: "bg-gray-200 text-gray-800" },
  { label: "Fashion", color: "bg-gray-200 text-gray-800" },
  { label: "Collecting (Stamps, Coins, Sneakers, etc.)", color: "bg-gray-200 text-gray-800" },
  { label: "Social Volunteering & Charity Work", color: "bg-orange-100 text-orange-700" },
  { label: "Content Creation", color: "bg-yellow-100 text-yellow-700" },
];

const HobbiesEditModal = ({ selectedHobbies = [], setSelectedHobbies, onClose }) => {
  const [search, setSearch] = useState("");
  const [localSelected, setLocalSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(selectedHobbies)) {
      const hydrated = selectedHobbies
        .map((label) => hobbiesList.find((h) => h.label === label))
        .filter(Boolean);
      setLocalSelected(hydrated);
    }
    AOS.init({ duration: 800, once: true });
  }, [selectedHobbies]);

  const toggleHobby = (hobby) => {
    setLocalSelected((prev) =>
      prev.some((h) => h.label === hobby.label)
        ? prev.filter((h) => h.label !== hobby.label)
        : [...prev, hobby]
    );
  };

  const handleSave = async () => {
    const hobbyLabels = localSelected.map((h) => h.label);
    setLoading(true);

    try {
      await patchUserProfile({ hobbies: hobbyLabels }); // ✅ cleaner integration
      setSelectedHobbies(hobbyLabels);
      toast.success("Hobbies updated successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to update hobbies:", error.message);
      toast.error("Failed to update hobbies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredHobbies = hobbiesList.filter((hobby) =>
    hobby.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl p-6 relative shadow-xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-1">What do you love to do?</h2>
        <p className="text-sm text-gray-500 mb-5">
          Pick a few hobbies that define you! This helps us match you with people who share your interests.
        </p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search hobbies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
        />

        {/* Hobby list */}
        <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto scrollbar-thin pr-1">
          {filteredHobbies.map((hobby) => {
            const isSelected = localSelected.find((h) => h.label === hobby.label);
            return (
              <button
                key={hobby.label}
                onClick={() => toggleHobby(hobby)}
                className={`flex items-center gap-1 text-xs sm:text-sm font-medium px-3 py-1 rounded-full transition-all duration-200 border ${
                  isSelected
                    ? `${hobby.color} border-purple-400 ring-2 ring-purple-300`
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                <FontAwesomeIcon icon={faBolt} className="text-[10px]" />
                {hobby.label}
              </button>
            );
          })}
        </div>

        {/* Save button */}
        <button
          className={`w-full mt-6 py-2 rounded-lg font-semibold text-white transition ${
            loading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
          }`}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Hobbies"}
        </button>
      </div>
    </div>
  );
};

export default HobbiesEditModal;
