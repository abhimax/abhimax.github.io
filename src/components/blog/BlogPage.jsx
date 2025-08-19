import { Routes, Route } from "react-router-dom";
import Blog from "./Blog";

const BlogPage = () => {
  return (
    <div className="blog-page-container">
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path=":slug" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default BlogPage;
