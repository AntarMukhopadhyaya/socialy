import { useEffect } from "react";

import CreatePostForm from "../components/CreatePostForm";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";

import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../reducers/postReducer";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <main className="container mt-5">
      <div className="row mt-5">
        <div className="col-md-8">
          <CreatePostForm />
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post._id}
                post = {post}
              />
            ))
          )}
        </div>
        <div className="col-md-4">
          <Sidebar />
        </div>
      </div>
    </main>
  );
};

export default Home;
