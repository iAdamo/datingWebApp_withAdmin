import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faUserPlus,
  faDownload,
  faEye,
  faEyeSlash,
  faLock,
  faTimes,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { get, post, patch, del } from "@/utils/api";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="max-h-screen bg-gray-50 p-6">
      <div data-aos="slide-right" data-aos-delay="300" className="mb-6">
        <h2 className="text-2xl font-bold hover:text-purple-600 text-gray-800">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Control your profile & team settings</p>
      </div>

      <div data-aos="fade-up" data-aos-delay="300" className="flex gap-3 border-b border-gray-200 mb-6">
        {["profile", "users", "password"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize ${
              activeTab === tab
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-600 hover:text-purple-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div data-aos="fade-up" data-aos-delay="300" className="bg-white rounded-lg shadow p-6">
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "users" && <UsersTab />}
        {activeTab === "password" && <PasswordTab />}
      </div>
    </div>
  );
};

const ProfileTab = () => {
  const [image, setImage] = useState("/images/avatar.png");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [tempImage, setTempImage] = useState("");
  const [tempName, setTempName] = useState("");
  const [tempEmail, setTempEmail] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await get("/admin/admins/");
      setImage(data.avatar || "/images/avatar.png");
      setFullName(data.name || "");
      setEmail(data.email || "");

      setTempImage(data.avatar || "/images/avatar.png");
      setTempName(data.name || "");
      setTempEmail(data.email || "");
    } catch (error) {
      console.error("Failed to fetch profile:", error.message);
    }
  };

  const handleRemoveImage = () => setTempImage("");

  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setTempImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        name: tempName,
        email: tempEmail,
        avatar: tempImage,
      };
      await patch("/admin/admins/", payload);
      setImage(tempImage);
      setFullName(tempName);
      setEmail(tempEmail);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error.message);
      alert("Update failed. Try again.");
    }
  };

  const handleCancel = () => {
    setTempImage(image);
    setTempName(fullName);
    setTempEmail(email);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-2">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Profile Settings</h3>
        <p className="text-sm text-gray-500 mt-1">These are your personal details</p>
      </div>

      <div className="flex items-center gap-4">
        <img
          src={tempImage || "/images/avatar-placeholder.png"}
          className="w-16 h-16 rounded-full object-cover border"
          alt="Profile"
        />
        <div className="space-x-2">
          <button onClick={handleRemoveImage} className="text-sm text-red-600 border border-red-300 px-3 py-1.5 rounded hover:bg-red-50 transition">
            Remove
          </button>
          <label className="text-sm text-gray-700 border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-50 transition cursor-pointer">
            Change
            <input type="file" accept="image/*" onChange={handleChangeImage} className="hidden" />
          </label>
        </div>
      </div>
      <p className="text-xs text-gray-400 -mt-4 ml-20">Min 400x400px, PNG or JPEG</p>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-700 block">Full Name</label>
          <input type="text" value={tempName} onChange={(e) => setTempName(e.target.value)} className="w-full border px-3 py-2 rounded border-gray-300 focus:outline-purple-500 text-sm" />
        </div>

        <div>
          <label className="text-sm text-gray-700 block">Email</label>
          <input type="email" value={tempEmail} onChange={(e) => setTempEmail(e.target.value)} className="w-full border px-3 py-2 rounded border-gray-300 focus:outline-purple-500 text-sm" />
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={handleCancel} className="flex-1 px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">Cancel</button>
        <button onClick={handleUpdate} className="flex-1 px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition">Update Profile</button>
      </div>
    </div>
  );
};

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const fetchUsers = async () => {
    try {
      const data = await get("/admin/users/");
      setUsers(data || []);
    } catch (err) {
      console.error("Error fetching users:", err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddAdmin = async () => {
    try {
      await post("/admin/admins/", formData);
      setShowAddModal(false);
      setFormData({ name: "", email: "" });
      setShowSuccessModal(true);
      fetchUsers();
    } catch (err) {
      console.error("Failed to add admin:", err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await del(`/admin/users/${id}/`);
      setShowSuccessModal(true);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete:", err.message);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-1">Team Members</h4>
          <p className="text-xs text-gray-500 mb-4">Invite your colleagues to collaborate together.</p>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">
              <FontAwesomeIcon icon={faDownload} />
              Export CSV
            </button>
            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-white bg-purple-600 rounded hover:bg-purple-700 transition"
              onClick={() => setShowAddModal(true)}
            >
              <FontAwesomeIcon icon={faUserPlus} />
              Add new Admin
            </button>
          </div>
        </div>

        <div className="col-span-1 md:col-span-3 overflow-x-auto">
          <table className="w-full border border-gray-200 rounded text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Date Added</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 border-b border-gray-300 relative">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <img src={user.avatar || "/images/avatar.png"} className="w-8 h-8 rounded-full" />
                    <span>{user.name}</span>
                  </td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.created_at?.slice(0, 10)}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      className="border border-gray-300 rounded px-2 py-1 hover:bg-gray-100"
                      onClick={() => setSelectedUser(user.id)}
                    >
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </button>

                    {selectedUser === user.id && (
                      <div className="absolute right-10 mt-2 w-32 bg-white border shadow rounded z-50">
                        <div
                          className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            // You can extend this for PATCH edit later
                            setSelectedUser(null);
                            setShowSuccessModal(true);
                          }}
                        >
                          Edit
                        </div>
                        <div
                          className="px-4 py-2 text-sm hover:bg-gray-100 text-red-600 cursor-pointer"
                          onClick={() => handleDelete(user.id)}
                        >
                          Remove
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-800">Add New Admin</h4>
              <button onClick={() => setShowAddModal(false)}>
                <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full mb-3 border px-3 py-2 rounded text-sm border-gray-300"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full mb-3 border px-3 py-2 rounded text-sm border-gray-300"
            />
            <button
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
              onClick={handleAddAdmin}
            >
              Add Admin
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow text-center w-full max-w-sm">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-3xl mb-2" />
            <h4 className="text-lg font-semibold text-gray-800 mb-1">Success</h4>
            <p className="text-sm text-gray-600 mb-4">Action completed successfully.</p>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              onClick={() => setShowSuccessModal(false)}
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const PasswordTab = () => {
  const [visible, setVisible] = useState(false);
  const [visibleNew, setVisibleNew] = useState(false);
  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Update Password</h3>
      <p className="text-sm text-gray-500 mt-1">Enter your current password to update it.</p>

      <div className="relative">
        <label className="text-sm text-gray-700 block mb-1">Current Password</label>
        <div className="relative">
          <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-400" />
          <input type={visible ? "text" : "password"} className="w-full border px-10 py-2 rounded border-gray-300 text-sm" />
          <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} className="absolute right-3 top-3 text-gray-400 cursor-pointer" onClick={() => setVisible(!visible)} />
        </div>
      </div>

      <div className="relative">
        <label className="text-sm text-gray-700 block mb-1">New Password</label>
        <div className="relative">
          <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-400" />
          <input type={visibleNew ? "text" : "password"} className="w-full border px-10 py-2 rounded border-gray-300 text-sm" />
          <FontAwesomeIcon icon={visibleNew ? faEyeSlash : faEye} className="absolute right-3 top-3 text-gray-400 cursor-pointer" onClick={() => setVisibleNew(!visibleNew)} />
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="flex-1 px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
          Cancel
        </button>
        <button className="flex-1 px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition">
          Update Password
        </button>
      </div>
    </div>
  );
};

export default Settings;
