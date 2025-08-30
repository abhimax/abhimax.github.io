import React from "react";
import GitHubCalendar from "react-github-calendar";
import { useTheme } from "../../context/ThemeContext";
import useResponsiveGithubCalendar from "../../hooks/useResponsiveGithubCalendar";
import "./github.css";

const Github = () => {
  const { isDarkMode } = useTheme();
  const { blockSize, fontSize, blockMargin } = useResponsiveGithubCalendar();
  return (
    <div className="git-wrapper">
      <GitHubCalendar
        username="abhimax"
        blockSize={blockSize}
        blockMargin={blockMargin}
        colorScheme={isDarkMode ? "dark" : "light"}
        fontSize={fontSize}
        showTotalCount={true}
        style={{ width: "100%", maxWidth: 700, margin: "0 auto" }}
      />
    </div>
  );
};

export default Github;
