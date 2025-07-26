import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

const WriteMessageModal = ({
  isOpen,
  onClose,
  likedName,
  profileImage,
  receiverId,
  onSend, // ✅ This is now passed from Search.jsx
}) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const maxLength = 200;

  const suggestedStarters = [
    "Assalam alaikum! How are you doing today?",
    "Your travel photos are amazing! Which camera do you use?",
    "What's your favorite thing about photography?"
  ];

  const handleSend = async () => {
    if (!message.trim()) {
      alert("Please write a message before sending.");
      return;
    }

    setLoading(true);
    try {
      await onSend(receiverId, message); // ✅ Use prop instead of internal API call
      setMessage("");
    } catch (error) {
      console.error("Send Message Error:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-40 z-50 flex items-center justify-center px-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg animate-fade-in-down relative">
        <div className="absolute -top-0 left-4">
          <img
            src={profileImage || "/images/avatar-placeholder.png"}
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-white shadow-md"
          />
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold">You liked {likedName}'s Profile! Break the Ice!</h3>

          <textarea
            placeholder={`Hey ${likedName}...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={maxLength}
            rows={4}
            className="w-full mt-4 border border-gray-300 rounded-lg p-3 text-sm outline-none resize-none"
          />
          <p className="text-right text-xs text-gray-400">{message.length}/{maxLength}</p>

          <div className="mt-4">
            <div className="flex items-center text-purple-600 font-semibold text-sm mb-2">
              <FontAwesomeIcon icon={faWandMagicSparkles} className="mr-2" />
              Suggested conversation starters
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              {suggestedStarters.map((starter, idx) => (
                <button
                  key={idx}
                  onClick={() => setMessage(starter)}
                  className="bg-gray-100 hover:bg-purple-100 text-gray-700 px-3 py-1 rounded-full"
                >
                  {starter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md text-sm disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send a Message"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteMessageModal;
