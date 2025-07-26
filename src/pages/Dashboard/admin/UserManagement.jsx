import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faUserSlash,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import {
  getUsers,
  getUserById,
  patchUserById,
  getReportById, // keep only if used
} from "@/utils/api";


const statusColors = {
  Active: "bg-green-100 text-green-700",
  Suspended: "bg-red-100 text-red-700",
};

const UserManagement = () => {
  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [showDropdown, setShowDropdown] = useState(false);
  const [suspendUser, setSuspendUser] = useState(false);
  const [banUser, setBanUser] = useState(false);
  const [userReports, setUserReports] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchUsers();
  }, []);

 const fetchUsers = async () => {
  try {
    const data = await getUsers();
    setUsersData(data);
  } catch (error) {
    console.error("Failed to fetch users:", error.message);
  }
};


  const handleUserSelect = async (user) => {
    try {
      const fullUser = await getUserById(user.id, token);
      setSelectedUser(fullUser);

      const reportData = await getReportById(user.id, token);
      setUserReports(reportData);
      setSuspendUser(fullUser.suspended || false);
      setBanUser(fullUser.banned || false);
    } catch (error) {
      console.error("Error loading user details:", error);
    }
  };

 const handleSuspendToggle = async () => {
  try {
    await patchUserById(selectedUser.id, { suspended: !suspendUser });
    setSuspendUser(!suspendUser);
  } catch (error) {
    console.error("Error suspending user:", error);
  }
};

const handleBanToggle = async () => {
  try {
    await patchUserById(selectedUser.id, { banned: !banUser });
    setBanUser(!banUser);
  } catch (error) {
    console.error("Error banning user:", error);
  }
};


  const usersPerPage = 8;
  const filteredUsers = usersData.filter(
    (u) =>
      (filterStatus === "ALL" || u.status === filterStatus) &&
      u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="relative p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 hover:text-purple-600 hover:scale-105 transition">
        User Management
      </h2>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition duration-300 cursor-pointer"
                  onClick={() => handleUserSelect(user)}
                >
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${statusColors[user.status]}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-purple-600 hover:underline">View</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 px-6 text-center text-gray-400">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-600 gap-3">
        <span>Page {currentPage} of {totalPages}</span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            &larr; Prev
          </button>
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded ${currentPage === page ? "bg-purple-600 text-white" : ""}`}
              >
                {page}
              </button>
            );
          })}
          <button
            className="px-3 py-1 border rounded"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next &rarr;
          </button>
        </div>
      </div>

      {/* Sliding User Panel */}
      {selectedUser && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setSelectedUser(null)}
          />
          <div className="fixed top-0 right-0 w-full sm:max-w-md h-full bg-[#FAFCFE] z-50 shadow-lg transition-all duration-500 overflow-y-auto">
            <div className="p-6 space-y-6">
              <h3 className="text-lg font-bold">User: {selectedUser.name}</h3>

              {showDropdown === "panel" && (
                <div className="absolute right-0 mt-2 w-64 bg-white border shadow border-gray-200 rounded-md z-50 text-sm">
                  <div className="flex justify-between items-center px-4 py-2 hover:bg-gray-50">
                    <div className="flex items-center gap-2 text-red-600">
                      <FontAwesomeIcon icon={faUserSlash} />
                      <span>Suspend User Account</span>
                    </div>
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={suspendUser}
                        onChange={handleSuspendToggle}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-purple-600 transition-all duration-300"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform duration-300"></div>
                    </label>
                  </div>

                  <div className="flex justify-between items-center px-4 py-2 hover:bg-gray-50">
                    <div className="flex items-center gap-2 text-purple-600">
                      <FontAwesomeIcon icon={faBan} />
                      <span>Ban User Account</span>
                    </div>
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={banUser}
                        onChange={handleBanToggle}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-purple-600 transition-all duration-300"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform duration-300"></div>
                    </label>
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-bold text-black mb-2 ml-2">Reported Issues & Warnings</p>
                <table className="min-w-full text-sm text-left border border-gray-200">
                  <thead>
                    <tr className="text-xs text-gray-700 uppercase bg-gray-100">
                      <th className="py-2 px-2">Reported By</th>
                      <th className="py-2 px-2">Date Reported</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userReports.length > 0 ? (
                      userReports.map((r, i) => (
                        <tr key={i} className="border-t border-gray-200">
                          <td className="py-2 px-2 text-gray-700">{r.reported_by}</td>
                          <td className="py-2 px-2 text-gray-600">{new Date(r.date_reported).toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="py-2 px-2 text-gray-500">No reports found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;
