// import Hero from "./components/hero/Hero";
// import Services from "./components/services/Services";
// import Portfolio from "./components/portfolio/Portfolio";
// import Contact from "./components/contact/Contact";

import React, { lazy, Suspense } from "react";
import ThemeToggle from "./components/theme/ThemeToggle";
import Navigation from "./components/navigation/Navigation";
import { Routes, Route, useLocation } from "react-router-dom";

const Hero = lazy(() => import("./components/hero/Hero"));
const Experience = lazy(() => import("./components/experience/Experience"));
const Skills = lazy(() => import("./components/skills/Skills"));
const Contact = lazy(() => import("./components/contact/Contact"));
const BlogPage = lazy(() => import("./components/blog/BlogPage"));

const App = () => {
  const location = useLocation();

  // Scroll to section if coming from navigation
  React.useEffect(() => {
    if (
      location.pathname === "/" &&
      location.state &&
      location.state.scrollTo
    ) {
      const sectionId = location.state.scrollTo;
      let attempts = 0;
      const maxAttempts = 20;
      const scrollToSection = () => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(scrollToSection, 100);
        }
      };
      scrollToSection();
    }
  }, [location]);

  return (
    <div className="container">
      <Navigation />
      <ThemeToggle />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <section id="home">
                <Suspense fallback={"loading..."}>
                  <Hero />
                </Suspense>
              </section>
              <section id="experience">
                <Suspense fallback={"loading..."}>
                  <Experience />
                </Suspense>
              </section>
              <section id="skills">
                <Suspense fallback={"loading..."}>
                  <Skills />
                </Suspense>
              </section>
              <section id="contact">
                <Suspense fallback={"loading..."}>
                  <Contact />
                </Suspense>
              </section>
            </>
          }
        />
        <Route
          path="/blog"
          element={
            <Suspense fallback={"loading..."}>
              <BlogPage />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
