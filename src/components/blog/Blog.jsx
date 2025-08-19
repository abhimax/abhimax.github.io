import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlogList from "./BlogList";
import BlogPost from "./BlogPost";
import { getAllBlogPosts, getBlogPostBySlug } from "./blogUtils";
import { useParams, useNavigate } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (slug) {
      getBlogPostBySlug(slug).then((post) => {
        setSelectedPost(post);
        setLoading(false);
      });
    } else {
      setSelectedPost(null);
      getAllBlogPosts().then((allPosts) => {
        setPosts(allPosts);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) return <div className="blog blogLoading">Loading...</div>;

  return (
    <div className="blog">
      <div className="blogContainer">
        <div className="blogHeader">
          <h2>My Posts</h2>
        </div>
        {selectedPost ? (
          <>
            <motion.button
              className="backToListBtn"
              onClick={() => navigate("/blog")}
              aria-label="Back to Blog"
              initial={{ scale: 0.7, opacity: 0, y: -20, x: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0, x: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{ position: 'absolute', top: 24, left: 24, zIndex: 10 }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </motion.button>
            <BlogPost post={selectedPost} />
          </>
        ) : (
          <BlogList posts={posts} />
        )}
      </div>
    </div>
  );
};

export default Blog;
