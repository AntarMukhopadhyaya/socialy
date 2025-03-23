import React, { useEffect, useState } from "react";
import api from "../api";
import socket from "../socket";
import { BsBellFill } from "react-icons/bs";

const NotificationBell = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(null);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const response = await api.get(`/notifications/${userId}`);
        setNotifications(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    loadNotifications();

    // Join the Socket.IO room
    socket.emit("joinRoom", userId);

    // Listen for incoming notifications
    socket.on("notification", (data) => {
      setNewNotification(data.message);
      loadNotifications(); // Refresh the notifications list
    });

    return () => {
      socket.off("notification");
    };
  }, [userId]); // Removed userId from dependency array

  const handleMarkAsRead = async (notificationId) => {
    await api.put(`notifications/read/${notificationId}`);
    setNotifications((prev) =>
      prev.map((notif) =>
        notif._id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const clearAllNotifications = async () => {
    await api.delete(`/notifications/clear/`);
    setNotifications([]);
    setNewNotification(null);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-accent dropdown-toggle"
        type="button"
        id="notificationDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <BsBellFill />
        {notifications.some((notif) => !notif.read) && (
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
        )}
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end shadow"
        aria-labelledby="notificationDropdown"
        style={{ maxHeight: "400px", overflowY: "auto", zIndex: 1050 }}
      >
        {newNotification && (
          <li className="dropdown-item text-info">{newNotification}</li>
        )}
        {notifications.length === 0 && (
          <li>
            <p className="dropdown-item text-muted">No notifications yet.</p>
          </li>
        )}
        {notifications.map((notif) => (
          <li key={notif._id} className="dropdown-item d-flex justify-content-between">
            <div>{notif.message}</div>
            {!notif.read && (
              <button
                className="btn btn-link btn-sm text-primary"
                onClick={() => handleMarkAsRead(notif._id)}
              >
                Mark as read
              </button>
            )}
          </li>
        ))}
        {notifications.length > 0 && (
          <li>
            <button
              className="btn btn-danger btn-sm w-100 mt-2"
              onClick={clearAllNotifications}
            >
              Clear All
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NotificationBell;
