import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ users: [], posts: [] });
  const [loading, setLoading] = useState(false);

  // Fetch Search Results
  const fetchSearchResult = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm) {
        setResults({ users: [], posts: [] });
        setLoading(false);
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
    <div className="container">
      {/* Search Input */}
      <div className="mb-3 d-flex align-items-center">
        <input
          type="text"
          className="form-control"
          placeholder="Search users or posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}

      {/* Display Users */}
      {results.users.length > 0 && (
        <div className="mb-4">
          <h5>Users</h5>
          {results.users.map((user) => (
            <div key={user._id} className="card p-2 mb-2 shadow-sm">
              <img
                src={user.profilePicture || "https://via.placeholder.com/50"}
                alt="Profile"
                className="rounded-circle"
                width="50"
                height="50"
              />
              <span className="ms-2 fw-bold">{user.username}</span>
              <span className="text-muted ms-2">({user.email})</span>
            </div>
          ))}
        </div>
      )}

      {/* Display Posts */}
      {results.posts.length > 0 && (
        <div>
          <h5>Posts</h5>
          {results.posts.map((post) => (
            <div key={post._id} className="card p-3 mb-3 shadow-sm">
              <h6>{post.title}</h6>
              <p>{post.content.substring(0, 100)}...</p>
              <span className="text-muted">By {post.postedBy.username}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
