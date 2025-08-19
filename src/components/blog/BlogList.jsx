
import React from "react";
import { Link } from "react-router-dom";
import "./blog.css";

// Helper to extract subtitle and excerpt from markdown (subtitle only if ## is immediately after #)
function extractSubtitleAndExcerpt(md) {
  const lines = md.split(/\r?\n/);
  let subtitle = '';
  let foundTitle = false;
  let subtitleLine = -1;
  let timeOrDateLine = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!foundTitle && line.startsWith('#')) {
      foundTitle = true;
      // Check next non-empty line for subtitle
      for (let j = i + 1; j < lines.length; j++) {
        const nextLine = lines[j].trim();
        if (!nextLine) continue;
        if (nextLine.startsWith('##')) {
          subtitle = nextLine.replace(/^##+\s*/, '');
          subtitleLine = j;
        }
        break;
      }
      break;
    }
  }
  // Find time/date line (e.g. 'min read' or date with year)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (/min read/.test(line) || /\d{4}/.test(line)) {
      timeOrDateLine = i;
      break;
    }
  }
  // Excerpt: first 3 content lines after subtitle (or after title if no subtitle), skipping time/date line
  let excerptLines = [];
  let startIdx = subtitleLine > -1 ? subtitleLine + 1 : lines.findIndex(l => l.trim().startsWith('#')) + 1;
  for (let i = startIdx; i < lines.length; i++) {
    if (i === timeOrDateLine) continue;
    const line = lines[i].trim();
    if (line && !line.startsWith('#') && !line.startsWith('![') && !line.startsWith('[')) {
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
              <div className="blogTileFooter">
                <div className="blogTileMeta">
                  {post.readTime && <span>{post.readTime}</span>}
                  {post.readTime && post.date && <span className="dot">·</span>}
                  {post.date && <span>{post.date}</span>}
                </div>
                <Link to={`/blog/${post.slug}`} className="readMoreBtn blogTileReadMore">
                  Read More
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default BlogList;
