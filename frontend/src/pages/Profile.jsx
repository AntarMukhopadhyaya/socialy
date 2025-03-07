
import React, { useEffect } from "react";
import { useParams } from "react-router";
import PostCard from "../components/PostCard";
import { FaUserFriends } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleFollow, fetchProfile } from "../reducers/profileReducer";

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: userProfile, loading } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(fetchProfile(id));
  }, [id, dispatch]);
  if (loading || !userProfile) {
    return <div className="text-center mt-5">Loading...</div>;
  }
  
  const handleFollow = () => {
    dispatch(toggleFollow(id));
  };
  
  return (
    <div className="container mt-4">
      <div className="card">
        {/* Cover Image Section */}
        <div className="position-relative">
          <img
            src={
              userProfile.coverImage
                ? `http://localhost:3000/uploads/${userProfile.coverImage}`
                : "https://placehold.co/1200x300?text=Cover+Image"
            }
            className="img-fluid w-100"
            alt="Cover"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
          {/* Profile Picture */}
          <img
            src={
              userProfile.profileImage
                ? `http://localhost:3000/uploads/${userProfile.profileImage}`
                : "https://placehold.co/150"
            }
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
              <h3>{userProfile.username}</h3>
              <p className="text-muted">
                {userProfile.bio || "No bio available"}
              </p>
            </div>
            <div>
              {userProfile.isMe ? (
                <a className="btn btn-primary me-2" href="/profile/update">
                  Edit Profile
                </a>
              ) : (
                <button
                  className={`btn ${
                    userProfile.isFollowing
                      ? "btn-outline-primary"
                      : "btn-primary"
                  } me-2`}
                  onClick={handleFollow}
                >
                  {userProfile.isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          </div>
          {/* Profile Statistics */}
          <div className="row text-center mt-4">
            <div className="col">
              <h5>{userProfile.following?.length || 0}</h5>
              <small>Followers</small>
            </div>
            <div className="col">
              <h5>120</h5>
              <small>Photos</small>
            </div>
            <div className="col">
              <h5>{userProfile.posts?.length || 0}</h5>
              <small>Posts</small>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row mt-5">
          {/* Left Side: User Posts */}
          <div className="col-md-8">
            <h4 className="mb-3">Posts</h4>
            {userProfile?.posts?.length > 0 ? (
              userProfile.posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))
            ) : (
              <p className="text-muted">No posts yet</p>
            )}
          </div>

          <div className="col-md-4">
            <h4 className="mb-3 text-success d-flex align-items-center">
              <FaUserFriends className="me-2" /> Following
            </h4>
            <div className="list-group shadow-sm rounded">
              {userProfile?.following?.length > 0 ? (
                userProfile.following.map((user, index) => (
                  <a
                    key={index}
                    href={`/profile/${user._id}`}
                    className="list-group-item list-group-item-action d-flex align-items-center border-0"
                  >
                    <img
                      src={`http://localhost:3000/uploads/${user.profileImage}`}
                      alt="Profile"
                      className="rounded-circle me-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                    <span className="fw-semibold text-dark">
                      {user.username}
                    </span>
                  </a>
                ))
              ) : (
                <p className="text-muted p-2">No followers yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
