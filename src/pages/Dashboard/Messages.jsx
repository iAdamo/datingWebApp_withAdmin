import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPaperPlane,
  faEllipsisV,
  faSortAmountDown,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import { get } from "@/utils/api";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [unmessagedMatches, setUnmessagedMatches] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState("recent");
  const menuRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchMessages = async () => {
      try {
        const unreadMessages = await get("/matchmaking/messages/unread/");
        const recentMatches = await get("/matchmaking/matches/unmessaged/");
        setMessages(unreadMessages);
        setUnmessagedMatches(recentMatches);
      } catch (err) {
        console.error("Error fetching messages:", err.message);
      }
    };

    fetchMessages();

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const filteredMessages = messages
    .filter(
      (msg) =>
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortMode === "favorite") return b.unread - a.unread;
      if (sortMode === "recent") return b.time.localeCompare(a.time);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 px-10 py-6" data-aos="fade-up">
        {/* Sidebar */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-start items-center gap-2 mb-4">
            {searchOpen ? (
              <input
                type="text"
                placeholder="Search messages..."
                className="border border-gray-300 text-sm px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            ) : (
              <h2 className="text-lg font-bold">Messages</h2>
            )}
            <FontAwesomeIcon
              icon={faSearch}
              className="text-gray-500 text-lg cursor-pointer hover:text-purple-600"
              onClick={() => setSearchOpen(!searchOpen)}
            />
            <FontAwesomeIcon
              icon={sortMode === "favorite" ? faStar : faSortAmountDown}
              className="text-gray-500 text-lg cursor-pointer hover:text-purple-600"
              onClick={() =>
                setSortMode((prev) => (prev === "favorite" ? "recent" : "favorite"))
              }
              title={`Sort by ${sortMode === "favorite" ? "recent" : "favorite"}`}
            />
          </div>

          {filteredMessages.length === 0 ? (
            <div className="mt-10 text-center">
              <h3 className="text-gray-600 font-bold">You don’t have any messages</h3>
              <p className="text-gray-500 text-sm">When you receive a new message, it will appear here.</p>
            </div>
          ) : (
            <>
              <h3 className="text-md font-semibold mt-4">Recent Matches</h3>
              <div className="flex mt-2 space-x-3">
                {unmessagedMatches.slice(0, 5).map((match, index) => (
                  <img
                    key={index}
                    src={match.avatar || "/images/avatar.png"}
                    alt={match.name || "User"}
                    className="w-10 h-10 rounded-full border-2 border-green-500"
                  />
                ))}
              </div>

              <div className="mt-4 space-y-4">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex justify-between items-center px-4 py-3 rounded-lg cursor-pointer ${
                      selectedChat?.id === msg.id ? "bg-purple-100" : "bg-gray-50"
                    }`}
                    onClick={() => setSelectedChat(msg)}
                  >
                    <div className="flex items-center space-x-3">
                      <img src={msg.avatar} alt={msg.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h4 className="text-md font-medium">{msg.name}</h4>
                        <p className="text-sm text-gray-500 truncate w-40">{msg.lastMessage}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">{msg.time}</p>
                      {msg.unread > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {msg.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Chat Box */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
          {selectedChat ? (
            <>
              <div className="flex justify-between items-center pb-4 border-b">
                <div className="flex items-center space-x-3">
                  <img src={selectedChat.avatar} alt={selectedChat.name} className="w-10 h-10 rounded-full" />
                  <h2 className="text-lg font-bold">{selectedChat.name}</h2>
                </div>

                <div className="relative" ref={menuRef}>
                  <button onClick={toggleMenu} className="p-2 focus:outline-none">
                    <FontAwesomeIcon icon={faEllipsisV} className="text-gray-500 text-lg cursor-pointer" />
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        View Profile
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
                        Block Profile
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
                        Report User Profile
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-4 overflow-y-auto flex-grow p-4">
                <div className="flex justify-start">
                  <div className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800">
                    <p>Hello Wunmi. Have you seen the latest holographic display technology?</p>
                    <p className="text-xs mt-1 text-gray-400">11:25</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="px-4 py-2 rounded-lg bg-[#7D52f4] text-white">
                    <p>Hi Mr Bello, How are you doing? I have a few questions please</p>
                    <p className="text-xs mt-1 text-gray-300">12:25</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center p-4 border-t">
                <input
                  type="text"
                  placeholder="Write your message..."
                  className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
                />
                <button className="bg-[#7D52f4] text-white px-4 py-2 rounded-lg ml-2">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
