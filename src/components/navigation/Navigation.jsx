import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navigation.css";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");

  const location = useLocation();
  const navItems = [
    {
      id: "home",
      label: location.pathname === "/blog" ? "Back to Home" : "Home",
    },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "blog", label: "Blog", isBlog: true },
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
  }, []);

  const navigate = useNavigate();

  // Scroll and navigate handler for non-blog links
  const handleNavClick = (sectionId) => {
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
        <div className="nav-brand">
          <span>Abhiman Ranaweera</span>
        </div>
        <ul className="nav-links">
          {location.pathname === "/blog" ? (
            <li key="home">
              <button
                className="nav-link"
                onClick={() => navigate("/", { replace: false })}
              >
                Back to Home
              </button>
            </li>
          ) : (
            navItems.map((item) => (
              <li key={item.id}>
                {item.isBlog ? (
                  <Link
                    to="/blog"
                    className={`nav-link ${
                      location.pathname === "/blog" ? "active" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    className={`nav-link ${
                      activeSection === item.id && location.pathname === "/"
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
