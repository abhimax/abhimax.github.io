import React from "react";
import { Link } from "react-router-dom";
import "./blog.css";

const BlogList = ({ posts }) => {
  return (
    <div className="blogGrid">
      {posts.map((post, index) => (
        <article key={post.slug} className="blogCard">
          <div className="blogImage">
            {post.image && <img src={post.image} alt={post.title} />}
            {post.category && (
              <div className="blogCategory">{post.category}</div>
            )}
          </div>
          <div className="blogContent">
            <div className="blogMeta">
              <span className="blogDate">{post.date}</span>
              {post.readTime && (
                <span className="blogReadTime">{post.readTime}</span>
              )}
            </div>
            <h3 className="blogTitle">{post.title}</h3>
            <p className="blogExcerpt">{post.description}</p>
            <div className="blogTags">
              {post.tags &&
                post.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="blogTag">
                    {tag}
                  </span>
                ))}
            </div>
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
