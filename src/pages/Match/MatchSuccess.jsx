import React, { useState } from "react";
import Navbar from "../Dashboard/Navbar";
import WriteMessageModal from "../ProfileSetup/WriteMessageModal"; // ✅ Make sure this is imported

const MatchSuccess = ({ yourImage, matchImage, matchName, onSkip }) => {
  const [showMessageModal, setShowMessageModal] = useState(false); // ✅ LEGALLY here

  return (
    <div className="mb-6">
      <Navbar />

      <div className="min-h-screen bg-[#A897FF] flex flex-col justify-center items-center px-4 text-center text-white">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-8">It’s a match!</h1>

        {/* Profile Images with Heart Icon */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="relative transform rotate-[-6deg] z-10">
            <img
              src={yourImage}
              alt="You"
              className="w-32 h-44 object-cover rounded-2xl shadow-lg"
            />
          </div>
          <div className="absolute z-20">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <img src="/images/icons.png" alt="Heart" className="w-auto h-auto" />
            </div>
          </div>
          <div className="relative transform rotate-[6deg] z-10">
            <img
              src={matchImage}
              alt="Match"
              className="w-32 h-44 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Message */}
        <p className="text-lg font-medium leading-snug max-w-sm">
          You and <span className="font-bold">{matchName}</span> like each other. Why not say Hi and be nice?
        </p>

        {/* Buttons */}
        <div className="mt-8 w-full max-w-xs">
          <button
            onClick={() => setShowMessageModal(true)}
            className="w-full bg-white text-gray-800 font-semibold py-2 rounded-full hover:bg-gray-100 transition"
          >
            Send Message
          </button>

          <button
            onClick={onSkip}
            className="w-full mt-4 text-white text-sm hover:underline"
          >
            Skip for now
          </button>
        </div>
      </div>

      {/* ✅ Conditionally Render the Message Modal */}
      <WriteMessageModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        likedName={matchName}
        profileImage={matchImage}
      />
    </div>
  );
};

export default MatchSuccess;
