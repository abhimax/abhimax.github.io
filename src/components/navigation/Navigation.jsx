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
      label: location.pathname === "/blog" ? "Back to Home" : "Home",
    },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "blog", label: "Blog", isBlog: true },
    { id: "portfolio", label: "portfolio" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const navigate = useNavigate();

  // Scroll and navigate handler for non-blog links
  const handleNavClick = (sectionId) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div
          className="nav-brand"
          style={{ cursor: "pointer" }}
          onClick={() => handleNavClick("home")}
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
                {item.isBlog ? (
                  <Link
                    to="/blog"
                    className={`nav-link${
                      location.pathname === "/blog" ? " active" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    className={`nav-link${
                      activeSection === item.id && location.pathname === "/"
                        ? " active"
                        : ""
                    }`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {isMobile && !location.pathname.startsWith("/blog") && (
        <ul className={`nav-links${menuOpen ? " nav-mobile-open" : ""}`}>
          {navItems.map((item) => (
            <li key={item.id}>
              {item.isBlog ? (
                <Link
                  to="/blog"
                  className={`nav-link${
                    location.pathname === "/blog" ? " active" : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  className={`nav-link${
                    activeSection === item.id && location.pathname === "/"
                      ? " active"
                      : ""
                  }`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
