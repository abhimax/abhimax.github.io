import React from "react";
import ReactMarkdown from "react-markdown";
import "./blog.css";

// Helper to extract subtitle (second heading) from markdown
function extractSubtitle(md) {
  const lines = md.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("##")) {
      return line.replace(/^##+\s*/, "");
    }
  }
  return "";
}

// Helper to remove first # and ## headings and profile image from markdown
function cleanMarkdown(md) {
  const lines = md.split(/\r?\n/);
  let foundTitle = false;
  let foundSubtitle = false;
  let foundProfileImg = false;
  return lines
    .filter((line) => {
      if (!foundTitle && line.trim().startsWith("#")) {
        foundTitle = true;
        return false;
      }
      if (!foundSubtitle && line.trim().startsWith("##")) {
        foundSubtitle = true;
        return false;
      }
      if (!foundProfileImg && /!\[[^\]]*\]\(([^)]+)\)/.test(line)) {
        foundProfileImg = true;
        return false;
      }
      return true;
    })
    .join("\n");
}

const BlogPost = ({ post }) => {
  const subtitle = extractSubtitle(post.content);
  const cleanedContent = cleanMarkdown(post.content);
  return (
    <article className="blogPost">
      <h1 className="blogPostTitle">{post.title}</h1>
      {subtitle && <h2 className="blogPostSubtitle">{subtitle}</h2>}
      <div className="blogAuthorRow">
        {post.profileImage && (
          <img
            className="blogProfilePic"
            src={post.profileImage}
            alt="Author profile"
          />
        )}
        <div className="blogAuthorMeta">
          {/* <span className="blogAuthorName">Abhiman Ranaweera</span> */}
          <span className="blogAuthorDetails">
            {post.readTime && <span>{post.readTime}</span>}
            {post.readTime && post.date && <span className="dot">·</span>}
            {post.date && <span>{post.date}</span>}
          </span>
        </div>
      </div>
      <div className="blogPostContent">
        <ReactMarkdown>{cleanedContent}</ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogPost;
