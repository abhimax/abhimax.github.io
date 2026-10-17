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

const getSectionMatchFromPath = (pathname) => {
  const currentPath = normalizePath(pathname);

  if (currentPath === "/") {
    return null;
  }

  return sectionRoutes.find((route) => route.path === currentPath) ?? null;
};

const scrollToSectionWithOffset = (sectionId, behavior = "auto") => {
  const element = document.getElementById(sectionId);
  if (!element) return;

  let top = 0;
  let current = element;

  while (current) {
    top += current.offsetTop || 0;
    current = current.offsetParent;
  }

  const targetTop = Math.max(top - 80, 0);
  let attempts = 0;

  const applyScroll = () => {
    window.scrollTo({
      top: targetTop,
      left: 0,
      behavior,
    });

    if (Math.abs(window.scrollY - targetTop) > 5 && attempts < 20) {
      attempts += 1;
      requestAnimationFrame(applyScroll);
    }
  };

  requestAnimationFrame(applyScroll);
};

const RouteNormalizer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useLayoutEffect(() => {
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
  const lastScrollRef = React.useRef("");

  React.useLayoutEffect(() => {
    const currentPath = normalizePath(location.pathname);
    const routeKey = `${currentPath}${location.hash}`;

    if (lastScrollRef.current === routeKey) {
      return;
    }

    lastScrollRef.current = routeKey;

    if (currentPath === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const matchedRoute = sectionRoutes.find(
      (route) => route.path === currentPath,
    );

    if (!matchedRoute) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const runScroll = () => {
      const el = document.getElementById(matchedRoute.id);
      if (!el) {
        requestAnimationFrame(runScroll);
        return;
      }

      scrollToSectionWithOffset(matchedRoute.id, "auto");
    };

    requestAnimationFrame(runScroll);
  }, [location.pathname, location.hash]);

  return null;
};

const App = () => {
  const location = useLocation();

  React.useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  React.useLayoutEffect(() => {
    const initialMatch = getSectionMatchFromPath(window.location.pathname);

    if (initialMatch) {
      const runInitialScroll = () => {
        const element = document.getElementById(initialMatch.id);
        if (!element) {
          requestAnimationFrame(runInitialScroll);
          return;
        }

        scrollToSectionWithOffset(initialMatch.id, "auto");
      };

      requestAnimationFrame(runInitialScroll);
    }
  }, []);

  React.useLayoutEffect(() => {
    const handlePageShow = () => {
      const matchedRoute = getSectionMatchFromPath(location.pathname);

      if (!matchedRoute) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        return;
      }

      requestAnimationFrame(() => {
        scrollToSectionWithOffset(matchedRoute.id, "auto");
      });
    };

    handlePageShow();
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [location.pathname]);

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
        {sectionRoutes.map(({ path }) => (
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
