import { motion } from "motion/react";
import "./blog.css";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Streamlining UI Library Development From Design to Release​",
      excerpt:
        "You’ve probably worked with a UI library before whether it’s a set of buttons, forms, modals, or grids that you can quickly drop into your projects. We’re all familiar with these pre-built, reusable components that save time and keep things consistent. ",
      category: "Frontend Development",
      readTime: "8 min read",
      date: "Dec 15, 2024",
      image: "/p1.jpg",
      tags: ["React", "UI Library Development", "Frontend"],
    },
    {
      id: 2,
      title: "Exploring React micro-frontend options for building MF apps.",
      excerpt:
        "In the previous article, we covered how to build a basic micro-frontend application from scratch. We explored four approaches for creating React Micro Frontend applications.",
      category: "Technology Trends",
      readTime: "12 min read",
      date: "Dec 10, 2024",
      image: "/p2.jpg",
      tags: ["Micro Frontend", "Web Development", "Future Tech"],
    },
    {
      id: 3,
      title:
        "How to fix the missing remoteEntry.js issue in Vite-Based Micro Frontends",
      excerpt:
        "When developing Micro-Frontend Apps using Vite and module federation, you might face the challenge of the remoteEntry.js file being unavailable during local development...",
      category: "Performance",
      readTime: "10 min read",
      date: "Dec 5, 2024",
      image: "/p3.jpg",
      tags: ["Vite Plugin Federation", "Vite Micro Frontend"],
    },
    {
      id: 4,
      title: "Boost Your Real-Time App Development with GraphQL Playground",
      excerpt:
        "A comprehensive guide to modern CSS layout techniques. Learn how to create responsive and flexible designs with CSS Grid and Flexbox.",
      category: "CSS",
      readTime: "15 min read",
      date: "Nov 28, 2024",
      image: "/p4.jpg",
      tags: ["GraphQL", "Real Time Update"],
    },
  ];

  const categories = [
    "All",
    "Frontend Development",
    "Technology Trends",
    "Performance",
    "CSS",
    "State Management",
    "Accessibility",
  ];

  return (
    <div className="blog">
      <div className="blogContainer">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="blogHeader"
        >
          <h2>Blog & Articles</h2>
          <p>Thoughts, tutorials, and insights about web development</p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="blogCategories"
        >
          {categories.map((category, index) => (
            <motion.button
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="categoryBtn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <div className="blogGrid">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="blogCard"
              whileHover={{ y: -10 }}
            >
              <div className="blogImage">
                <img src={post.image} alt={post.title} />
                <div className="blogCategory">{post.category}</div>
              </div>
              <div className="blogContent">
                <div className="blogMeta">
                  <span className="blogDate">{post.date}</span>
                  <span className="blogReadTime">{post.readTime}</span>
                </div>
                <h3 className="blogTitle">{post.title}</h3>
                <p className="blogExcerpt">{post.excerpt}</p>
                <div className="blogTags">
                  {post.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="blogTag">
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.button
                  className="readMoreBtn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read More
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
