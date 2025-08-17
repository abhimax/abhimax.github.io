import { TypeAnimation } from "react-type-animation";
import { motion } from "motion/react";

const Speech = () => {
  return (
    <motion.div
      className="bubbleContainer"
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1 }}
    >
      <div className="bubble">
        <TypeAnimation
          sequence={[
            1000,
            "I’m a seasoned Frontend Engineer with technical expertise and creative flair, specializing in React.",
            1000,
            "I’m an expert at Micro Frontends, component libraries, and developing complex, high-quality UIs.",
            1000,
            ,
            "I'm a Technical Writer and AWS enthusiast, with a passion for AI and cloud technologies.",
            1000,
          ]}
          wrapper="span"
          speed={60}
          deletionSpeed={60}
          // omitDeletionAnimation
          repeat={Infinity}
        />
      </div>
      <img src="/man.png" alt="" />
    </motion.div>
  );
};

export default Speech;
