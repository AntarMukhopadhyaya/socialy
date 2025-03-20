import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ users: [], posts: [] });
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Fetch Search Results
  const fetchSearchResult = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm) {
        setResults({ users: [], posts: [] });
        setLoading(false);
        setShowResults(false);
        return;
      }
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/search?query=${searchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setResults(data);
        setShowResults(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    fetchSearchResult(query);
  }, [query, fetchSearchResult]);

  return (
    <div className="position-relative">
      {/* Search Input */}
      <div className="input-group">
        <span className="input-group-text bg-dark text-cyan border-neon">
          <FaSearch />
        </span>

        <input
          type="text"
          className="form-control bg-dark text-cyan border-neon rounded-full"
          placeholder="Search users or posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)} 
          
        />
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div
          className="position-absolute bg-dark border-neon shadow p-2"
          style={{
            width: "100%",
            maxHeight: "300px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {loading && <p className="text-cyan">Loading...</p>}

          {/* Display Users */}
          {results.users.length > 0 && (
            <div>
              <h6 className="text-neon">Users</h6>
              {results.users.map((user) => (
                <div
                  key={user._id}
                  className="d-flex align-items-center p-2 border-bottom border-neon-hover"
                >
                  <img
                    src={`http://localhost:3000/uploads/${user.profileImage}`}
                    alt="Profile"
                    className="rounded-circle border-neon"
                    width="40"
                    height="40"
                  />
                  <Link
                    to={`/profile/${user._id}`}
                    className="text-decoration-none text-neon-hover"
                  >
                    <div className="ms-2">
                      <span className="fw-bold">{user.username}</span>
                      <small className="text-muted d-block">{user.bio}</small>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Display Posts */}
          {results.posts.length > 0 && (
            <div>
              <h6 className="text-neon mt-2">Posts</h6>
              {results.posts.map((post) => (
                <div key={post._id} className="p-2 border-bottom border-neon-hover">
                  <h6 className="mb-1">{post.title}</h6>
                  <p className="text-muted">
                    {post.content.substring(0, 80)}...
                  </p>
                  <small className="text-cyan">
                    By {post.postedBy.username}
                  </small>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {results.users.length === 0 &&
            results.posts.length === 0 &&
            !loading && (
              <p className="text-muted text-center">No results found</p>
            )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
