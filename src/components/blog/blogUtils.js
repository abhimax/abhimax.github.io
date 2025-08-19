// Utility to load all markdown files in blog-posts and parse frontmatter

// Helper to extract first heading, image, and paragraph from markdown
function extractPreviewFromMarkdown(md) {
  // Title: first non-empty line starting with #
  const lines = md.split(/\r?\n/);
  let title = '';
  let images = [];
  let excerpt = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!title && line.startsWith('#')) {
      title = line.replace(/^#+\s*/, '');
    }
    const imgMatch = line.match(/!\[[^\]]*\]\(([^)]+)\)/);
    if (imgMatch) images.push(imgMatch[1]);
    if (!excerpt && line && !line.startsWith('#') && !line.startsWith('![') && !line.startsWith('[')) {
      excerpt = line;
    }
    if (title && images.length >= 2 && excerpt) break;
  }
  // Use first image as profile, second as tile (if available)
  return {
    title,
    image: images[1] || images[0] || '', // tile image: prefer 2nd image
    profileImage: images[0] || '', // profile image: first image
    description: excerpt
  };
}

export async function getAllBlogPosts() {
  // Process all .md files in blog-posts
  const files = import.meta.glob("../../blog-posts/*.md", { as: "raw" });
  const posts = [];
  for (const path in files) {
    const raw = await files[path]();
    const slug = path.split("/").pop().replace(/\.md$/, "");
    const preview = extractPreviewFromMarkdown(raw);
    posts.push({ ...preview, content: raw, slug });
  }
  // Sort by title for now (could use date if available)
  posts.sort((a, b) => a.title.localeCompare(b.title));
  return posts;
}

export async function getBlogPostBySlug(slug) {
  const files = import.meta.glob("../../blog-posts/*.md", { as: "raw" });
  for (const path in files) {
    if (path.includes(`${slug}.md`)) {
      const raw = await files[path]();
      const preview = extractPreviewFromMarkdown(raw);
      return { ...preview, content: raw, slug };
    }
  }
  return null;
}
