import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    const fetchProfileDetails = async () => {
      const response = await axios
        .get("http://localhost:3000/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setUserProfile(response.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
  });
  const profile = {
    coverImage: "https://placehold.co/1200x300?text=Cover+Image",
    profilePicture: "https://placehold.co/150",
    name: "John Doe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.",
    friends: 250,
    photos: 120,
    posts: 75,
  };

  return (
    <div className="container mt-4">
      <div className="card">
        {/* Cover Image Section */}
        <div className="position-relative">
          <img
            src={profile.coverImage}
            className="img-fluid w-100"
            alt="Cover"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
          {/* Profile Picture */}
          <img
            src={profile.profilePicture}
            alt="Profile"
            className="rounded-circle position-absolute"
            style={{
              width: "150px",
              height: "150px",
              bottom: "-75px",
              left: "30px",
              border: "5px solid white",
            }}
          />
        </div>
        {/* Profile Details */}
        <div className="card-body mt-5">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h3>{profile.name}</h3>
              <p className="text-muted">{profile.bio}</p>
            </div>
            <div>
              <button className="btn btn-primary me-2">Add Friend</button>
              <button className="btn btn-secondary">Message</button>
            </div>
          </div>
          {/* Profile Statistics */}
          <div className="row text-center mt-4">
            <div className="col">
              <h5>{profile.friends}</h5>
              <small>Friends</small>
            </div>
            <div className="col">
              <h5>{profile.photos}</h5>
              <small>Photos</small>
            </div>
            <div className="col">
              <h5>{profile.posts}</h5>
              <small>Posts</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
