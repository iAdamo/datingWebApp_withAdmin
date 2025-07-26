import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import SidebarReports from "../../../components/admin/SidebarReports";


const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Switch Based on Tab */}
      {activeTab === "safety" ? <SidebarReports /> : <Sidebar />}

      {/* Page Content */}
      <div className="flex-1 p-6 bg-white">
        <Outlet context={{ activeTab, setActiveTab }} />
      </div>
    </div>
  );
};

export default AdminLayout;
