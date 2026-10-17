import React, { lazy, Suspense } from "react";
import ThemeToggle from "./components/theme/ThemeToggle";
import Navigation from "./components/navigation/Navigation";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import ScrollToTopButton from "./components/ScrollToTopButton";

const Hero = lazy(() => import("./components/hero/Hero"));
const Experience = lazy(() => import("./components/experience/Experience"));
const Skills = lazy(() => import("./components/skills/Skills"));
const Portfolio = lazy(() => import("./components/portfolio/Portfolio"));
const Events = lazy(() => import("./components/events/Events"));
const Testimonials = lazy(
  () => import("./components/testimonials/Testimonials"),
);
const Contact = lazy(() => import("./components/contact/Contact"));
const BlogPage = lazy(() => import("./components/blog/BlogPage"));

const renderSection = (id, Component) => (
  <section id={id}>
    <Suspense fallback={"loading..."}>
      <Component />
    </Suspense>
  </section>
);

const normalizePath = (pathname) => {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/")
    ? pathname.replace(/\/+$/, "") || "/"
    : pathname;
};

const HomePage = () => (
  <>
    {renderSection("home", Hero)}
    {renderSection("experience", Experience)}
    {renderSection("skills", Skills)}
    {renderSection("portfolio", Portfolio)}
    {renderSection("events", Events)}
    {renderSection("testimonials", Testimonials)}
    {renderSection("contact", Contact)}
  </>
);

const sectionRoutes = [
  { path: "/experience", id: "experience" },
  { path: "/skills", id: "skills" },
  { path: "/portfolio", id: "portfolio" },
  { path: "/events", id: "events" },
  { path: "/testimonials", id: "testimonials" },
  { path: "/contact", id: "contact" },
];

const scrollToSectionWithOffset = (sectionId, behavior = "auto") => {
  let attempts = 0;
  const maxAttempts = 30;
  const navOffset = 80;

  const tryScroll = () => {
    const el = document.getElementById(sectionId);
    if (!el) {
      if (attempts < maxAttempts) {
        attempts += 1;
        requestAnimationFrame(tryScroll);
      }
      return;
    }

    const top = Math.max(el.offsetTop - navOffset, 0);
    window.scrollTo({ top, behavior });
  };

  requestAnimationFrame(tryScroll);
};

const RouteNormalizer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const normalizedPath = normalizePath(location.pathname);

    if (normalizedPath !== location.pathname) {
      navigate(`${normalizedPath}${location.search}${location.hash}`, {
        replace: true,
      });
    }
  }, [location.pathname, location.search, location.hash, navigate]);

  return null;
};

const ScrollToRouteSection = () => {
  const location = useLocation();

  React.useEffect(() => {
    const currentPath = normalizePath(location.pathname);
    const matchedRoute = sectionRoutes.find(
      (route) => route.path === currentPath,
    );

    if (!matchedRoute) {
      if (currentPath !== "/") {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
      return;
    }

    scrollToSectionWithOffset(matchedRoute.id);
  }, [location.pathname]);

  return null;
};

const App = () => {
  return (
    <div className="container">
      <Navigation />
      <ThemeToggle />
      <ScrollToTopButton />
      <RouteNormalizer />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ScrollToRouteSection />
              <HomePage />
            </>
          }
        />
        {sectionRoutes.map(({ path, id }) => (
          <Route
            key={path}
            path={path}
            element={
              <>
                <ScrollToRouteSection />
                <HomePage />
              </>
            }
          />
        ))}
        <Route
          path="/blog/*"
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
