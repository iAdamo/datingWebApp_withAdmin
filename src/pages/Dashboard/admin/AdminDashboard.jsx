import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  faSearch,
  faUser,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import {
  getDashboardStats,
  getPopularProfiles,
  getTopLocations,
  getUserGrowth,
  getReports,
  getUsers,
  getUserById,
  patchReportById,
} from "@/utils/api";
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  ChartDataLabels
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { activeTab, setActiveTab } = useOutletContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [popularProfiles, setPopularProfiles] = useState([]);
  const [topLocations, setTopLocations] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });


    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [
        statsRes,
        profilesRes,
        locationsRes,
        growthRes,
        reportsRes,
        usersRes,
      ] = await Promise.all([
        getDashboardStats(),
        getPopularProfiles(),
        getTopLocations(),
        getUserGrowth(),
        getReports(),
        getUsers(),
      ]);

      setStats(statsRes?.data || []);
      setPopularProfiles(profilesRes?.data || []);
      setTopLocations(locationsRes?.data || []);
      setUserGrowth(growthRes?.data || []);
      setReports(reportsRes?.data || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Error fetching dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = async (id) => {
    try {
      const res = await getUserById(id);
      console.log("User detail:", res.data); // Replace with modal logic
    } catch (error) {
      alert("Error loading user details", error);
      console.error("Error loading user:", error);
      toast.error("Error loading user details");
    }
  };

  const handleReportStatusUpdate = async (reportId, newStatus) => {
    try {
      await patchReportById(reportId, { status: newStatus });
      toast.success("Report updated");
      fetchDashboardData();
    } catch (error) {
      console.error("Error updating report:", error);
      toast.error("Failed to update report");
    }
  };

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "userGrowth", label: "User Growth & Engagement" },
    { key: "safety", label: "Safety" },
  ];

  const filteredProfiles = popularProfiles.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-white">
      {/* Tabs */}
      <div className="flex overflow-x-auto gap-0 mb-4 border border-gray-300 rounded-2xl bg-white shadow-sm">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-5 py-2 text-sm font-medium border-l first:border-l-0 transition-all ${
              activeTab === key
                ? "bg-white text-gray-900 shadow-inner font-semibold"
                : "bg-gray-50 text-gray-700 hover:bg-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                onClick={
                  stat.title.toLowerCase().includes("user")
                    ? () => navigate("/admin/users")
                    : stat.title.toLowerCase().includes("report")
                    ? () => navigate("/admin/reports")
                    : undefined
                }
                className="bg-[#F5F7FA] p-5 rounded-lg flex items-center gap-4 hover:scale-105 cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-white bg-[#7D52F4] p-3 rounded-full"
                />
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Popular Profiles */}
          <div className="bg-white p-6 rounded shadow mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Most Liked Profiles</h3>
              <div className="relative w-64">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-3 pr-10 py-2 border rounded focus:outline-none"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute right-3 top-3 text-gray-400"
                />
              </div>
            </div>
            <div className="space-y-2">
              {filteredProfiles.length > 0 ? (
                filteredProfiles.map((user, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleUserClick(user.id)}
                    className="flex justify-between px-3 py-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer"
                  >
                    <span>{user.name}</span>
                    <span>{user.likes} LIKES</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No matching profiles found.</p>
              )}
            </div>
          </div>

          {/* Top Locations */}
          <div className="bg-white mt-6 p-6 rounded shadow">
            <h3 className="font-bold mb-2">Top Locations</h3>
             <div className="h-96">
            <Bar
              data={{
                labels: topLocations.map((loc) => loc.name),
                datasets: [
                  {
                    label: "Users",
                    data: topLocations.map((loc) => loc.count),
                    backgroundColor: "#7D52F4",
                  },
                ],
              }}
               options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
        }}
            />
          </div>
          </div>
        </>
      )}

      {/* User Growth Tab */}
      {activeTab === "userGrowth" && (
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-bold mb-2">User Growth</h3>
          <div className="h-96">
          <Line
            data={{
              labels: userGrowth.map((month) => month.month),
              datasets: [
                {
                  label: "New Users",
                  data: userGrowth.map((month) => month.count),
                  borderColor: "#7D52F4",
                  fill: false,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
            }}
          />
          </div>
        </div>
      )}

      {/* Safety Tab */}
      {activeTab === "safety" && (
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-bold mb-4">Reports Summary</h3>
          <div className="space-y-3">
            {reports.length > 0 ? (
              reports.map((rep) => (
                <div
                  key={rep.id}
                  className="flex justify-between items-center px-3 py-2 bg-gray-50 rounded hover:bg-gray-100"
                >
                  <div>
                    <p className="font-semibold">{rep.category}</p>
                    <p className="text-sm text-gray-600">{rep.description}</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="text-sm text-gray-500">{rep.status}</span>
                    <FontAwesomeIcon
                      icon={faEye}
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleUserClick(rep.user_id)}
                    />
                    <button
                      className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded"
                      onClick={() => {
                        if (window.confirm("Mark this report as resolved?")) {
                          handleReportStatusUpdate(rep.id, "resolved");
                        }
                      }}
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No reports available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
