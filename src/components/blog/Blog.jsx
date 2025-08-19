
import React, { useEffect, useState } from "react";
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
          <h2>Blog & Articles</h2>
          <p>Thoughts, tutorials, and insights about web development</p>
        </div>
        {selectedPost ? (
          <>
            <button className="backToListBtn" onClick={() => navigate("/blog")}>← Back to Blog</button>
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
