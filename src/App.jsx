// import Hero from "./components/hero/Hero";
// import Services from "./components/services/Services";
// import Portfolio from "./components/portfolio/Portfolio";
// import Contact from "./components/contact/Contact";

import { lazy, Suspense } from "react";
import LazyLoad from "react-lazyload";
import ThemeToggle from "./components/theme/ThemeToggle";

const Hero = lazy(() => import("./components/hero/Hero"));
const Experience = lazy(() => import("./components/experience/Experience"));
const Skills = lazy(() => import("./components/skills/Skills"));
const Blog = lazy(() => import("./components/blog/Blog"));
const Contact = lazy(() => import("./components/contact/Contact"));

const App = () => {
  return (
    <div className="container">
      <ThemeToggle />
      
      <Suspense fallback={"loading..."}>
        <LazyLoad height={"100vh"} offset={-100}>
          <section id="#home">
            <Hero />
          </section>
        </LazyLoad>
      </Suspense>
      
      <Suspense fallback={"loading..."}>
        <LazyLoad height={"100vh"} offset={-100}>
          <section id="#experience">
            <Experience />
          </section>
        </LazyLoad>
      </Suspense>
      
      <Suspense fallback={"loading..."}>
        <LazyLoad height={"100vh"} offset={-100}>
          <section id="#skills">
            <Skills />
          </section>
        </LazyLoad>
      </Suspense>
      
      <Suspense fallback={"loading..."}>
        <LazyLoad height={"100vh"} offset={-100}>
          <section id="#blog">
            <Blog />
          </section>
        </LazyLoad>
      </Suspense>
      
      <Suspense fallback={"loading..."}>
        <LazyLoad height={"100vh"} offset={-100}>
          <section id="#contact">
            <Contact />
          </section>
        </LazyLoad>
      </Suspense>
    </div>
  );
};

export default App;
