import React from "react";
import { useNavigate } from "react-router-dom";
import MatchSuccess from "./MatchSuccess";
import Navbar from "../Dashboard/Navbar";
import { useLocation } from "react-router-dom";
const MatchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { yourImage, matchImage, matchName } = location.state || {};

  return (
    <MatchSuccess
      yourImage={yourImage}
      matchImage={matchImage}
      matchName={matchName}
      onSendMessage={() => navigate("/messages")}
      onSkip={() => navigate("/dashboard")}
    />
  );
};

export default MatchPage;
