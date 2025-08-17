import { motion } from "motion/react";
import "./blog.css";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Building Modern React Applications with TypeScript",
      excerpt: "Learn how to leverage TypeScript in React to build more robust and maintainable applications. Discover best practices and common patterns.",
      category: "Frontend Development",
      readTime: "8 min read",
      date: "Dec 15, 2024",
      image: "/p1.jpg",
      tags: ["React", "TypeScript", "Frontend"]
    },
    {
      id: 2,
      title: "The Future of Web Development: AI-Powered Tools",
      excerpt: "Explore how artificial intelligence is transforming the way we build websites and applications. From code generation to automated testing.",
      category: "Technology Trends",
      readTime: "12 min read",
      date: "Dec 10, 2024",
      image: "/p2.jpg",
      tags: ["AI", "Web Development", "Future Tech"]
    },
    {
      id: 3,
      title: "Performance Optimization Techniques for React Apps",
      excerpt: "Discover advanced techniques to improve your React application's performance. From code splitting to memoization strategies.",
      category: "Performance",
      readTime: "10 min read",
      date: "Dec 5, 2024",
      image: "/p3.jpg",
      tags: ["React", "Performance", "Optimization"]
    },
    {
      id: 4,
      title: "Mastering CSS Grid and Flexbox Layouts",
      excerpt: "A comprehensive guide to modern CSS layout techniques. Learn how to create responsive and flexible designs with CSS Grid and Flexbox.",
      category: "CSS",
      readTime: "15 min read",
      date: "Nov 28, 2024",
      image: "/p4.jpg",
      tags: ["CSS", "Layout", "Responsive Design"]
    },
    {
      id: 5,
      title: "State Management in Large-Scale Applications",
      excerpt: "Compare different state management solutions for React applications. From Redux to Zustand, find the right tool for your project.",
      category: "State Management",
      readTime: "14 min read",
      date: "Nov 20, 2024",
      image: "/p5.jpg",
      tags: ["React", "State Management", "Redux"]
    },
    {
      id: 6,
      title: "Building Accessible Web Applications",
      excerpt: "Learn how to create web applications that are accessible to all users. Implement ARIA labels, keyboard navigation, and more.",
      category: "Accessibility",
      readTime: "11 min read",
      date: "Nov 15, 2024",
      image: "/p1.jpg",
      tags: ["Accessibility", "Web Standards", "UX"]
    }
  ];

  const categories = ["All", "Frontend Development", "Technology Trends", "Performance", "CSS", "State Management", "Accessibility"];

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
                    <span key={tagIndex} className="blogTag">{tag}</span>
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

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="blogNewsletter"
        >
          <h3>Stay Updated</h3>
          <p>Get the latest articles and insights delivered to your inbox</p>
          <div className="newsletterForm">
            <input type="email" placeholder="Enter your email address" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog; 