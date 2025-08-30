import { useState, useEffect } from "react";

const useResponsiveGithubCalendar = () => {
  const [size, setSize] = useState({
    blockSize: 16,
    fontSize: 16,
    blockMargin: 5,
  });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 400) {
        setSize({ blockSize: 8, fontSize: 10, blockMargin: 2 });
      } else if (window.innerWidth < 600) {
        setSize({ blockSize: 10, fontSize: 12, blockMargin: 2 });
      } else if (window.innerWidth < 900) {
        setSize({ blockSize: 13, fontSize: 14, blockMargin: 3 });
      } else {
        setSize({ blockSize: 16, fontSize: 16, blockMargin: 5 });
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
};

export default useResponsiveGithubCalendar;
