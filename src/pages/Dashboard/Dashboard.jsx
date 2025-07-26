import Navbar from "./Navbar";
import StatsCards from "./Card";
import Matches from "./Matches";

import ProfileCompletion from "./ProfileCompletion";

const Dashboard = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <StatsCards />
      <Matches />
      
      <ProfileCompletion />
    </div>
  );
};

export default Dashboard;
