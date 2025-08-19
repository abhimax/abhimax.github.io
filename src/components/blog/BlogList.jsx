import React from "react";
import { Link } from "react-router-dom";
import "./blog.css";

const BlogList = ({ posts }) => {
  return (
    <div className="blogGrid">
      {posts.map((post) => (
        <article key={post.slug} className="blogCard">
          <div className="blogImage">
            {post.image && <img src={post.image} alt={post.title} />}
          </div>
          <div className="blogContent">
            <h3 className="blogTitle">{post.title}</h3>
            <p className="blogExcerpt">{post.description}</p>
            <Link to={`/blog/${post.slug}`} className="readMoreBtn">
              Read More
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BlogList;
