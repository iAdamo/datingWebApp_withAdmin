import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheckCircle, faCamera, faTrash } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import BioEditModal from "./BioEditModal";
import HobbiesEditModal from "./HobbiesEditModal";
import PersonalInfoEditModal from "./PersonalInfoEditModal";
import {
  fetchUserProfile,
  uploadProfilePhoto,
  deleteProfilePhoto,
} from "@/utils/api";
import { toast } from "react-toastify";
import AOS from "aos";

const Profile = () => {
  const [bio, setBio] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBioModal, setShowBioModal] = useState(false);
  const [showHobbiesModal, setShowHobbiesModal] = useState(false);
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await fetchUserProfile();
      setBio(data.bio);
      setProfileData(data);
      setHobbies(data.hobbies);
      setProfileImage(data.profileImage);
      setGalleryPhotos(data.galleryPhotos || []);
    } catch {
      toast.error("Failed to fetch profile");
    }
  };

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);
      try {
        setLoading(true);
        const res = await uploadProfilePhoto(formData);
        setProfileImage(res.url);
        toast.success("Profile photo uploaded");
      } catch {
        toast.error("Upload failed");
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePhotoUpload = async (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);
      try {
        setLoading(true);
        const res = await uploadProfilePhoto(formData);
        const updated = [...galleryPhotos];
        updated[index] = res;
        setGalleryPhotos(updated);
        toast.success("Photo uploaded");
      } catch {
        toast.error("Photo upload failed");
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePhotoDelete = async (id, index) => {
    try {
      setLoading(true);
      await deleteProfilePhoto(id);
      const updated = galleryPhotos.filter((_, i) => i !== index);
      setGalleryPhotos(updated);
      toast.success("Photo deleted");
    } catch {
      toast.error("Failed to delete photo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="relative bg-gradient-to-b from-[#A897FF] to-[#d7cdff] h-30">
        <div className="max-w-6xl mx-auto relative z-10 px-4 sm:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4 pt-20">
            <div className="relative -mt-30 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 group">
              <img
                src={profileImage || "/images/icon.png"}
                alt="Profile"
                className="w-full h-full object-cover rounded-2xl border-6 border-white shadow-xl shadow-gray-400 group-hover:scale-105 transition-transform duration-300"
              />
              <label
                htmlFor="profile-upload"
                className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-purple-100 transition"
              >
                <FontAwesomeIcon icon={faCamera} className="text-purple-600" />
              </label>
              <input
                type="file"
                id="profile-upload"
                className="hidden"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
            </div>
            <div className="text-center md:text-left mt-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                {profileData?.full_name || "User Name"}
                <FontAwesomeIcon icon={faCheckCircle} className="text-blue-400" />
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-10 gap-y-2 mt-2 text-sm font-medium text-gray-800">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase">Gender</span>
                  <span>{profileData?.gender || "N/A"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase">Age</span>
                  <span>{profileData?.age ? `${profileData.age} Years` : "N/A"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase">Location</span>
                  <span>{profileData?.location || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6 mt-20">
        {/* Photos */}
        <div className="bg-white border border-purple-300 rounded-lg px-4 py-4 shadow-md transition-all duration-300 hover:shadow-xl">
          <h2 className="text-sm font-semibold uppercase text-gray-700 mb-4">Photos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {galleryPhotos.map((photo, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden group border border-gray-200 hover:shadow-md transition-all duration-300">
                <img src={photo.url || photo} alt="User" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <label htmlFor={`photo-upload-${i}`} className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-purple-100 transition">
                  <FontAwesomeIcon icon={faCamera} className="text-purple-600" />
                </label>
                <input type="file" id={`photo-upload-${i}`} className="hidden" accept="image/*" onChange={(e) => handlePhotoUpload(e, i)} />
                <button onClick={() => handlePhotoDelete(photo.id, i)} className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-red-600 hover:bg-red-100 transition">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
            {[...Array(4 - galleryPhotos.length)].map((_, i) => (
              <label key={i} className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm h-32 cursor-pointer hover:border-purple-400 hover:text-purple-600 transition">
                <input type="file" className="hidden" onChange={(e) => handlePhotoUpload(e, galleryPhotos.length + i)} />
                + Upload Photo
              </label>
            ))}
          </div>
        </div>
      </div>

      {showBioModal && <BioEditModal bio={bio} setBio={setBio} onClose={() => setShowBioModal(false)} />}
      {showHobbiesModal && <HobbiesEditModal hobbies={hobbies} setHobbies={setHobbies} onClose={() => setShowHobbiesModal(false)} />}
      {showPersonalInfoModal && (
        <PersonalInfoEditModal
          onClose={() => setShowPersonalInfoModal(false)}
          currentData={{ religion: "Hinduism", maritalStatus: "Never Married", occupation: "Entrepreneur" }}
          onSave={(updated) => console.log("New personal info:", updated)}
        />
      )}
    </div>
  );
};

export default Profile;
