import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEye,
  faTriangleExclamation,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNow } from "date-fns";
import { getActivityFeed, markNotificationRead} from "@/utils/api";

const ICON_MAP = {
  match: faUser,
  view: faEye,
  reminder: faTriangleExclamation,
  default: faBell,
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchNotifications(1);
  }, []);

  const fetchNotifications = async (pageNumber) => {
    try {
      setLoadingMore(true);
      const data = await getActivityFeed(pageNumber);
      if (data.length === 0) setHasMore(false);
      setNotifications((prev) => [...prev, ...data]);
    } catch (err) {
      console.error("Error fetching notifications:", err.message);
      setError("Could not load notifications. Try again.");
    } finally {
      setLoadingMore(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, is_read: true } : notif
        )
      );
    } catch (err) {
      console.error("Failed to mark as read:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fa] text-gray-800">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6 hover:text-[#7D52f4] hover:scale-105 transition">
          Notifications
        </h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-offset="150"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          className="bg-white hover:scale-105 transition rounded-lg shadow-sm divide-y"
        >
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              No notifications yet.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start justify-between px-5 py-4 cursor-pointer transition hover:bg-purple-100 ${
                  notif.is_read ? "bg-white" : "bg-purple-50"
                }`}
                onClick={() => handleMarkAsRead(notif.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <FontAwesomeIcon
                      icon={ICON_MAP[notif.notification_type] || ICON_MAP.default}
                    />
                  </div>
                  <div className="max-w-xs md:max-w-md">
                    <p className="font-semibold text-sm capitalize">
                      {notif.notification_type}
                    </p>
                    <p className="text-sm text-gray-600">{notif.message}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1 whitespace-nowrap">
                  {formatDistanceToNow(new Date(notif.created_at), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => {
                const nextPage = page + 1;
                setPage(nextPage);
                fetchNotifications(nextPage);
              }}
              className="bg-[#7D52f4] hover:bg-[#6b45e3] text-white px-6 py-2 rounded-lg text-sm disabled:opacity-50"
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
