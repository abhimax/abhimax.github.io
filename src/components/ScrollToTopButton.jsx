import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./scrollToTopButton.scss";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button if not in hero section (scrolled more than 200px)
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHero = () => {
    const heroSection = document.getElementById("home");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      className={`scroll-to-top-btn${visible ? " show" : ""}`}
      onClick={scrollToHero}
      aria-label="Scroll to top"
    >
      <FaArrowUp size={24} />
    </button>
  );
};

export default ScrollToTopButton;
