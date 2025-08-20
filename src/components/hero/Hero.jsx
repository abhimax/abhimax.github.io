import { Canvas } from "@react-three/fiber";
import "./hero.css";
import Speech from "./Speech";
import { motion } from "motion/react";
import Shape from "./Shape";
import { Suspense } from "react";
import { FaGithub, FaMedium, FaLinkedin } from "react-icons/fa";
import Github from "../github/Github";

const awardVariants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.2,
    },
  },
};

const followVariants = {
  initial: {
    y: -100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.2,
    },
  },
};

const Hero = () => {
  return (
    <div className="hero">
      <div className="hSection left">
        {/* TITLE */}
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="hTitle"
        >
          Hey There,
          <br />
          <span>I'm Abhiman!</span>
        </motion.h1>
        {/* AWARDS */}
        <motion.div
          variants={awardVariants}
          initial="initial"
          animate="animate"
          className="awards"
          speed={600}
        >
          <motion.h2 variants={awardVariants}>
            Senior Technical Lead @ 99x
          </motion.h2>
          <motion.img variants={awardVariants} src="/99x-logo.png" alt="" />
          <motion.p variants={awardVariants}>
            Seasoned Frontend Developer | Front-end Development Pro | Micro
            Frontend, React, Redux, TypeScript Expert
          </motion.p>
        </motion.div>
        {/* SCROLL SVG */}
        <motion.a
          animate={{ y: [0, 5], opacity: [0, 1, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
          href="#experience"
          className="scroll"
        >
          <svg
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9Z"
              stroke="white"
              strokeWidth="1"
            />
            <motion.path
              animate={{ y: [0, 5] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              d="M12 5V8"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </motion.a>
      </div>
      <div className="hSection right">
        {/* FOLLOW */}
        <motion.div
          variants={followVariants}
          initial="initial"
          animate="animate"
          className="follow"
        >
          <motion.a
            variants={followVariants}
            href="https://github.com/abhimax"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub Profile"
          >
            <FaGithub className="social-icon" />
          </motion.a>
          <motion.a
            variants={followVariants}
            href="https://medium.com/@abhimanranaweera"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Medium Profile"
          >
            <FaMedium className="social-icon" />
          </motion.a>
          <motion.a
            variants={followVariants}
            href="https://www.linkedin.com/in/abhiman-ranaweera-14a45177/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="social-icon" />
          </motion.a>
          <motion.div variants={followVariants} className="followTextContainer">
            <div className="followText">FOLLOW ME</div>
          </motion.div>
        </motion.div>
        {/* BUBBLE */}
        <Speech />
      </div>
      <div className="bg">
        {/* 3d */}
        <Canvas>
          <Suspense fallback="loading...">
            <Shape />
          </Suspense>
        </Canvas>
        <div className="hImg">
          <img src="/hero.png" alt="" />
        </div>
        {/* GitHub graph as background/overlay at bottom of Hero */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            zIndex: 1,
            pointerEvents: "none",
            opacity: 0.6,
          }}
        >
          <Github />
        </div>
      </div>
    </div>
  );
};

export default Hero;
