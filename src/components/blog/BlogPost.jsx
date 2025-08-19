import React from "react";
import ReactMarkdown from "react-markdown";
import "./blog.css";

const BlogPost = ({ post }) => {
  return (
    <article className="blogPost">
      <h1 className="blogPostTitle">{post.title}</h1>
      <div className="blogPostMeta">
        <span>{post.date}</span>
        {post.readTime && <span> • {post.readTime}</span>}
      </div>
      <div className="blogPostContent">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogPost;
