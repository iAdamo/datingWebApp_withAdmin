import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faEllipsisV,
  faMagnifyingGlass,
  faFilter,
  faChevronDown,
  faArrowLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

// 📋 Reports API
import {
  getReports,
  patchReportById,
  deleteReportById,
} from "@/utils/api";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-700",
  "UNDER REVIEW": "bg-orange-100 text-orange-700",
  RESOLVED: "bg-green-100 text-green-700",
  ACTIVE: "bg-emerald-100 text-emerald-700",
  SUSPENDED: "bg-red-100 text-red-700",
};

const statusOptions = ["PENDING", "UNDER REVIEW", "RESOLVED"];

const Reports = () => {
  const navigate = useNavigate();
  const [reportsData, setReportsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [showDropdown, setShowDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);
  const reportsPerPage = 8;

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const loadReports = async () => {
      try {
        const data = await getReports();
        setReportsData(data || []);
      } catch (error) {
        console.error("Failed to fetch reports:", error.message);
        toast.error("Error loading reports");
      }
    };

    loadReports();
  }, [navigate]);

  const updateStatus = async (reportId, newStatus) => {
    try {
      await patchReportById(reportId, { status: newStatus });
      setReportsData((prev) =>
        prev.map((report) =>
          report.id === reportId ? { ...report, status: newStatus } : report
        )
      );
      if (selectedReport?.id === reportId) {
        setSelectedReport({ ...selectedReport, status: newStatus });
      }
      toast.success("Status updated");
    } catch (error) {
      console.error("Failed to update report status:", error.message);
      toast.error("Failed to update status");
    }
  };

  const deleteReport = async (reportId) => {
    try {
      await deleteReportById(reportId);
      setReportsData((prev) => prev.filter((r) => r.id !== reportId));
      setSelectedReport(null);
      toast.success("Report deleted");
    } catch (error) {
      console.error("Failed to delete report:", error.message);
      toast.error("Failed to delete report");
    }
  };

  const filteredReports = reportsData.filter((report) => {
    const matchStatus = statusFilter === "ALL" || report.status === statusFilter;
    const matchType = typeFilter === "ALL" || report.issue === typeFilter;
    const combinedText = `
      ${report.reported_user?.name || ""}
      ${report.reported_by?.name || ""}
      ${report.issue || ""}
      ${report.status || ""}
      ${report.date || ""}
    `.toLowerCase();
    const matchSearch = combinedText.includes(searchTerm.toLowerCase());
    return matchStatus && matchType && matchSearch;
  });

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );

  const navigateToProfile = (userId) => navigate(`/profile/${userId}`);

  return (
    <div className="relative bg-[#FDFDFD] z-50">
      <div className="p-6 transition-all duration-300">
        <h2 className="text-2xl hover:text-purple-600 hover:scale-105 transition font-bold text-gray-800 mb-4">
          Report Management
        </h2>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-3">Reported User</th>
                <th className="px-6 py-3">Reported By</th>
                <th className="px-6 py-3">Report Type</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedReports.map((report) => (
                <tr
                  key={report.id}
                  className="border-t hover:bg-gray-50 transition duration-300 cursor-pointer"
                  onClick={() => setSelectedReport(report)}
                >
                  <td className="px-6 py-4">{report.reported_user?.name || "N/A"}</td>
                  <td className="px-6 py-4">{report.reported_by?.name || "N/A"}</td>
                  <td className="px-6 py-4">{report.issue}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${statusColors[report.status]}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{report.date}</td>
                  <td className="px-6 py-4 text-right">
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-red-500 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteReport(report.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-4 text-sm text-gray-600 gap-3">
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
      </div>

      {/* Sliding Panel */}
      {selectedReport && (
        <>
          <div
            data-aos="slide-left"
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setSelectedReport(null)}
          />

          <div
            data-aos="slide-left"
            className="fixed top-0 right-0 w-full sm:max-w-md h-full bg-[#FAFCFE] z-50 shadow-lg transition-transform transform translate-x-0 duration-500 overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              <button
                onClick={() => setSelectedReport(null)}
                className="text-sm text-gray-500 flex items-center gap-1 hover:underline"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-gray-600 border border-gray-300 rounded border-md px-2 py-1 bg-white"
                />
                Back to Reports
              </button>

              <div className="flex justify-between items-start relative">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold">Report ID: #{selectedReport.id}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColors[selectedReport.status]}`}>
                    {selectedReport.status}
                  </span>
                </div>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    className="cursor-pointer px-2 py-1 text-gray-500 hover:text-gray-700 border rounded-md border-gray-300 bg-white"
                    onClick={() => setShowDropdown((prev) => (prev === "panel-status" ? null : "panel-status"))}
                  />
                  {showDropdown === "panel-status" && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow z-50">
                      {statusOptions.map((status) => (
                        <div
                          key={status}
                          className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${selectedReport.status === status ? "bg-purple-100 font-medium" : ""}`}
                          onClick={() => updateStatus(selectedReport.id, status)}
                        >
                          {status}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <hr className="my-4 border-t border-gray-300" />

              {/* Report Details */}
              <div>
                <p className="text-xs text-gray-500 mb-1">REPORTED USER</p>
                <div className="flex items-center gap-3">
                  <img
                    src={selectedReport?.reported_user?.profile_image || "/images/avatar.png"}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <button
                    onClick={() =>
                      selectedReport?.reported_user?.id &&
                      navigateToProfile(selectedReport.reported_user.id)
                    }
                    className="text-sm text-black hover:underline"
                  >
                    {selectedReport?.reported_user?.name || "Unknown"}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">REPORTED BY</p>
                <div className="flex items-center gap-3">
                  <img
                    src={selectedReport?.reported_by?.profile_image || "/images/icon.png"}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <button
                    onClick={() =>
                      selectedReport?.reported_by?.id &&
                      navigateToProfile(selectedReport.reported_by.id)
                    }
                    className="text-sm text-black hover:underline"
                  >
                    {selectedReport?.reported_by?.name || "Unknown"}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">DATE SUBMITTED</p>
                <p className="text-sm">{selectedReport.date}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">REPORT TYPE</p>
                <span className="text-xs px-3 py-1 bg-gray-100 rounded-full">
                  {selectedReport.issue}
                </span>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">REPORT DESCRIPTION</p>
                <div
                  className="text-sm text-gray-700"
                  dangerouslySetInnerHTML={{ __html: selectedReport.description }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
