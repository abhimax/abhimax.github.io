// Utility to load all markdown files in blog-posts and parse frontmatter

// Helper to extract first heading, image, and paragraph from markdown
function extractPreviewFromMarkdown(md) {
  // Title: first non-empty line starting with #
  const lines = md.split(/\r?\n/);
  let title = '';
  let image = '';
  let excerpt = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!title && line.startsWith('#')) {
      title = line.replace(/^#+\s*/, '');
    }
    if (!image) {
      const imgMatch = line.match(/!\[[^\]]*\]\(([^)]+)\)/);
      if (imgMatch) image = imgMatch[1];
    }
    if (!excerpt && line && !line.startsWith('#') && !line.startsWith('![') && !line.startsWith('[')) {
      excerpt = line;
    }
    if (title && image && excerpt) break;
  }
  return { title, image, description: excerpt };
}

export async function getAllBlogPosts() {
  // Only process post-1.md for now
  const files = import.meta.glob("../../blog-posts/post-1.md", { as: "raw" });
  const posts = [];
  for (const path in files) {
    const raw = await files[path]();
    const slug = path.split("/").pop().replace(/\.md$/, "");
    const preview = extractPreviewFromMarkdown(raw);
    posts.push({ ...preview, content: raw, slug });
  }
  return posts;
}

export async function getBlogPostBySlug(slug) {
  const files = import.meta.glob("../../blog-posts/post-1.md", { as: "raw" });
  for (const path in files) {
    if (path.includes(`${slug}.md`)) {
      const raw = await files[path]();
      const preview = extractPreviewFromMarkdown(raw);
      return { ...preview, content: raw, slug };
    }
  }
  return null;
}
