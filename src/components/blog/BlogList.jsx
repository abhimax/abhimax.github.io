
import React from "react";
import { Link } from "react-router-dom";
import "./blog.css";

// Helper to extract subtitle and excerpt from markdown
function extractSubtitleAndExcerpt(md) {
  const lines = md.split(/\r?\n/);
  let subtitle = '';
  let foundSubtitle = false;
  let excerptLines = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!subtitle && line.startsWith('##')) {
      subtitle = line.replace(/^##+\s*/, '');
      foundSubtitle = true;
      continue;
    }
    if (foundSubtitle && line && !line.startsWith('#') && !line.startsWith('![') && !line.startsWith('[')) {
      excerptLines.push(line);
      if (excerptLines.length >= 3) break;
    }
  }
  return { subtitle, excerpt: excerptLines.join(' ') };
}

const BlogList = ({ posts }) => {
  return (
    <div className="blogGrid">
      {posts.map((post) => {
        const { subtitle, excerpt } = extractSubtitleAndExcerpt(post.content);
        return (
          <article key={post.slug} className="blogCard">
            <div className="blogImage">
              {post.image && <img src={post.image} alt={post.title} />}
            </div>
            <div className="blogContent">
              <h3 className="blogTitle">{post.title}</h3>
              {subtitle && <div className="blogTileSubtitle">{subtitle}</div>}
              {excerpt && (
                <p className="blogExcerpt">
                  {excerpt.length > 120 ? excerpt.slice(0, 120) + '…' : excerpt}
                </p>
              )}
              <div className="blogMeta">
                {post.readTime && <span>{post.readTime}</span>}
                {post.readTime && post.date && <span className="dot">·</span>}
                {post.date && <span>{post.date}</span>}
              </div>
              <Link to={`/blog/${post.slug}`} className="readMoreBtn">
                Read More
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default BlogList;
