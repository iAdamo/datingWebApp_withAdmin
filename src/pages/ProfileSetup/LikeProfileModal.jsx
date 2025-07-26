const LikeProfileModal = ({
    isOpen,
    onClose,
    likedName,
    profileImage,
    onSendMessage, // 🔑 New prop
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-opacity-40 z-50 flex items-center justify-center px-4  bg-black/30 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md animate-fade-in-down relative">
          {/* Profile Image */}
          <div className="absolute -top-0 left-4">
            <img
              src={profileImage || "/images/pro.png"}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
            />
          </div>
  
          <div className="mt-8 text-center">
            <h3 className="text-base font-bold">You liked {likedName}'s Profile!</h3>
            <p className="text-gray-600 text-sm mt-1">Want to start a conversation?</p>
  
            {/* Buttons */}
            <div className="mt-5 flex justify-center gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-100"
              >
                Not Now
              </button>
              <button
                onClick={() => {
                  onSendMessage(); // ✅ Trigger message modal
                  onClose(); // ✅ Close like modal
                }}
                className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white text-sm"
              >
                Send a Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default LikeProfileModal;
  