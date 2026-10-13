import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navigation.scss";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );
  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);
  return matches;
}

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");

  const location = useLocation();
  const navItems = [
    {
      id: "home",
      label: location.pathname.startsWith("/blog") ? "Back to Home" : "Home",
      path: "/",
    },
    { id: "experience", label: "Experience", path: "/experience" },
    { id: "skills", label: "Skills", path: "/skills" },
    { id: "portfolio", label: "Portfolio", path: "/portfolio" },
    { id: "testimonials", label: "Testimonials", path: "/testimonials" },
    { id: "contact", label: "Contact", path: "/contact" },
    { id: "blog", label: "Blog", path: "/blog", isBlog: true },
  ];

  useEffect(() => {
    if (location.pathname !== "/") {
      const routeName =
        location.pathname.split("/").filter(Boolean)[0] || "home";
      const mappedSection = routeName === "blog" ? "home" : routeName || "home";
      setActiveSection(mappedSection);
      return;
    }

    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, navItems]);

  const navigate = useNavigate();

  const isItemActive = (item) => {
    if (item.isBlog) {
      return location.pathname.startsWith("/blog");
    }

    if (location.pathname !== "/") {
      if (item.id === "home") {
        return location.pathname === "/";
      }
      return location.pathname === item.path;
    }

    if (item.id === "home") {
      return activeSection === "home";
    }

    return activeSection === item.id;
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div
          className="nav-brand"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <span>Abhiman Ranaweera</span>
        </div>
        {isMobile && location.pathname.startsWith("/blog") && (
          <ul className="nav-links nav-mobile-open">
            <li key="home">
              <button className="nav-link active" onClick={() => navigate("/")}>
                Back to Home
              </button>
            </li>
          </ul>
        )}
        {isMobile && !location.pathname.startsWith("/blog") && (
          <button
            className={`nav-hamburger${menuOpen ? " open" : ""}`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>
        )}
        {!isMobile && location.pathname.startsWith("/blog") && (
          <ul className="nav-links">
            <li key="home">
              <button className="nav-link active" onClick={() => navigate("/")}>
                Back to Home
              </button>
            </li>
          </ul>
        )}
        {!isMobile && !location.pathname.startsWith("/blog") && (
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`nav-link${isItemActive(item) ? " active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isMobile && !location.pathname.startsWith("/blog") && (
        <ul className={`nav-links${menuOpen ? " nav-mobile-open" : ""}`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`nav-link${isItemActive(item) ? " active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
