import "./contact.css";
import { useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion, useInView } from "motion/react";
import ContactSvg from "./ContactSvg";

const listVariant = {
  initial: {
    x: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const Contact = () => {
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-200px" });
  const [state, handleSubmit] = useForm("xzzaeyrw");
  const [emailError, setEmailError] = useState("");

  // Email validation function
  function validateEmail(email) {
    // Simple regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function onFormSubmit(e) {
    const form = e.target;
    const email = form.user_email.value;
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      e.preventDefault();
      return;
    } else {
      setEmailError("");
    }
    handleSubmit(e);
  }

  return (
    <div className="contact" ref={ref}>
      <div className="cSection">
        <motion.form
          onSubmit={onFormSubmit}
          variants={listVariant}
          animate={isInView ? "animate" : "initial"}
        >
          <motion.h1 variants={listVariant} className="cTitle">
            Let&apos;s keep in touch
          </motion.h1>
          {state.succeeded ? (
            <motion.p variants={listVariant} style={{ color: "var(--accent-primary)", marginTop: 24 }}>
              Your message has been sent!
            </motion.p>
          ) : <>
            <motion.div variants={listVariant} className="formItem">
              <label htmlFor="user_username">Name</label>
              <input type="text" id="user_username" name="user_username" placeholder="John Doe" />
              <ValidationError prefix="Name" field="user_username" errors={state.errors} />
            </motion.div>
            <motion.div variants={listVariant} className="formItem">
              <label htmlFor="user_email">Email</label>
              <input type="email" id="user_email" name="user_email" placeholder="john@gmail.com" />
              <ValidationError prefix="Email" field="user_email" errors={state.errors} />
              {emailError && <span style={{ color: "#ff6b6b", fontSize: 14 }}>{emailError}</span>}
            </motion.div>
            <motion.div variants={listVariant} className="formItem">
              <label htmlFor="user_message">Message</label>
              <textarea rows={10} id="user_message" name="user_message" placeholder="Write your message..." />
              <ValidationError prefix="Message" field="user_message" errors={state.errors} />
            </motion.div>
            <motion.button variants={listVariant} className="formButton" type="submit" disabled={state.submitting}>
              Send
            </motion.button>
          </>}
        </motion.form>
      </div>
      <div className="cSection"><ContactSvg/></div>
    </div>
  );
};

export default Contact;
