import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CreatePostForm from "../components/CreatePostForm";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import api from "../api";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("http://localhost:3000/api/posts");
      setPosts(response.data);
    }
    fetchPosts();
  },[]);
  const addNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  }
  return (
    <main className="container mt-5">
      <div className="row mt-5">
        <div className="col-md-8">
          <CreatePostForm onPostCreated={addNewPost} />
            {posts.map((post) => (
              <PostCard
                key={post._id}
                id={post._id}
                postedBy={post.postedBy}
                date={post.createdAt}
                content={post.content}
                likesCount={post.likes.length}
              />
            ))}
        
        </div>
        <div className="col-md-4">
          <Sidebar />
        </div>
      </div>
    </main>
  );
};

export default Home;
