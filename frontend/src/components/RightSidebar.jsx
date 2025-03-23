import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router";

const RightSidebar = () => {
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await api.get(
          "http://localhost:3000/api/users/followers"
        );
        const data = await response.data;
        console.log(data);
        setFollowers(data);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };
    fetchFollowers();
  }, []);
  console.log(followers);
  return (
    <div className="col-lg-3 d-none d-lg-block">
      {/* Suggestions / Ads / Trending Topics */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Your Followers</h5>
          {followers.length === 0 ? (
            <p className="text-muted">No followers yet.</p>
          ) : (
            <ul className="list-group list-group-flush">
              {followers.map((follower) => (
                <li
                  key={follower.followerId._id}
                  className="list-group-item d-flex align-items-center"
                >
                  <img
                    src={`http://localhost:3000/uploads/${follower.followerId.profileImage}`}
                    alt={`${follower.followerId.username}'s profile`}
                    className="rounded-circle me-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <Link
                      to={`/profile/${follower.followerId._id}`}
                      className="text-decoration-none fw-bold text-primary"
                    >
                      {follower.followerId.username}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
