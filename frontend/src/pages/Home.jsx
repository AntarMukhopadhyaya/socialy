import { useEffect } from "react";
import CreatePostForm from "../components/CreatePostForm";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../reducers/postReducer";
import RightSidebar from "../components/RightSidebar";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <main className="container mt-4">
      <div className="row justify-content-center">
        {/* Left Sidebar */}
        <div className="col-lg-3 d-none d-lg-block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-lg-6 col-md-8">
          {/* Create Post Form */}
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <CreatePostForm />
            </div>
          </div>

          {/* Posts List */}
          {isLoading ? (
            <div className="text-center mt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="card mb-4 shadow-sm">
                <PostCard post={post} />
              </div>
            ))
          )}
        </div>

        <RightSidebar />
      </div>
    </main>
  );
};

export default Home;
