import React from "react";
import GitHubCalendar from "react-github-calendar";
import "./github.css";

const Github = () => {
  return (
    <div className="git-wrapper">
      <GitHubCalendar
        username="abhimax"
        blockSize={16}
        blockMargin={5}
        colorScheme="dark"
        fontSize={16}
        showTotalCount={true}
        style={{ width: "100%", maxWidth: 700, margin: "0 auto" }}
      />
    </div>
  );
};

export default Github;
