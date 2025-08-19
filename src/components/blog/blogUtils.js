// Utility to load all markdown files in blog-posts and parse frontmatter
import fm from "front-matter";

export async function getAllBlogPosts() {
  // Vite's import.meta.glob for static markdown import
  const files = import.meta.glob("../../blog-posts/*.md", { as: "raw" });
  const posts = [];
  for (const path in files) {
    const raw = await files[path]();
    const { attributes, body } = fm(raw);
    const slug = path.split("/").pop().replace(/\.md$/, "");
    posts.push({ ...attributes, content: body, slug });
  }
  // Sort by date descending
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
}

export async function getBlogPostBySlug(slug) {
  const files = import.meta.glob("../../blog-posts/*.md", { as: "raw" });
  for (const path in files) {
    if (path.includes(`${slug}.md`)) {
      const raw = await files[path]();
      const { attributes, body } = fm(raw);
      return { ...attributes, content: body, slug };
    }
  }
  return null;
}
