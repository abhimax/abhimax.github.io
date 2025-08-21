import { motion } from "motion/react";
import { MdGroupAdd } from "react-icons/md";
import "./experience.css";

const Experience = () => {
  const experiences = [
    {
      year: "2023 DEC - Present",
      title: "Senior Technical Lead",
      company: "99x Technology",
      logo: "/99x-logo.png",
      description:
        "Led the frontend transformation by developing a serverless, scalable solutions using cutting edge technologies. Drove innovation by building a reusable component library and Micro-Frontend architecture, while ensuring alignment with business goals through efficient CI/CD processes and mentoring developers.",
      technologies: [
        "React",
        "TypeScript",
        "Frontend transformation",
        "Serverless solutions",
        "Micro-Frontend",
        "GraphQL",
        "CI/CD",
        "Agile",
        "Design Systems",
      ],
    },
    {
      year: "2022 JAN - 2023 DEC",
      title: "Lead - UI Engineering",
      promotion: "Associate UI Specialist ⮕ Lead - UI Engineering",
      company: "Mad Mobile",
      logo: "/madmobile-logo.png",
      description:
        "Led the development of high-performance, scalable front-end solutions, optimizing React components for speed and user experience. Drove the adoption of configuration-driven design, created prototypes, and promoted best practices in UI development and code quality. Collaborated in agile teams, ensuring efficient testing and seamless integration across products.",
      technologies: [
        "React",
        "Front-end solutions",
        "Performance optimization",
        "Component architecture",
        "Stakeholder engagement",
        "Agile",
      ],
    },
    {
      year: "2014 MAY - 2022 JAN",
      title: "Associate UI Specialist",
      promotion: "Senior UI Engineer ⮕ Associate UI Specialist",
      company: "Sysco Labs Sri Lanka",
      logo: "/syscolabs-logo.png",
      description:
        "Specialized in React and ES6 for front-end development and UI design. Led the creation of a shared UI npm library, enhanced workflows through user feedback, and contributed to an Agile team.",
      technologies: [
        "Web Development",
        "POS UI Development",
        "React",
        "ES6",
        "Agile",
      ],
    },
    {
      year: "2012 JUL - 2014 MAR",
      title: "Software & UI Engineer",
      company: "Multplx (Pvt) Ltd",
      logo: "/multplx-logo.png",
      description:
        "Specialized in front-end development for Android, Windows, and iPhone platforms. Led UI design for retail distribution maps using Google API and developed responsive websites with PHP, jQuery, and modern frameworks.",
      technologies: [
        "Web Development",
        "Mobile Development",
        "Sales & Distribution Maps",
      ],
    },
    {
      year: "2011 FEB - 2012 JUL",
      title: "Software Engineer",
      promotion: "Associate Software Engineer ⮕ Software Engineer",
      company: "Interblocks (Pvt) Ltd",
      logo: "/interblocks-logo.png",
      description:
        "Developed Android mobile banking apps and online banking websites for client banks. Designed ATM screens using ActionScript and created themes for online banking sites with CSS, jQuery, Ajax, and XSLT.",
      technologies: [
        "Java",
        "JSP",
        "ActionScript",
        "ATM Frontend Development",
        "Web Development",
      ],
    },
  ];

  return (
    <div className="experience">
      <div className="experienceContainer">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="experienceHeader"
        >
          <h2>Experience</h2>
          <p>My professional journey in Software Development</p>
        </motion.div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`timelineItem ${index % 2 === 0 ? "left" : "right"}`}
            >
              <div className="timelineContent">
                <div className="timelineYear">{exp.year}</div>
                <div className="jobHeader">
                  <div className="companyLogo">
                    <img src={exp.logo} alt={`${exp.company} logo`} />
                  </div>
                  <div className="jobInfo">
                    <h3>{exp.title}</h3>
                    {exp.promotion && (
                      <div className="promotion">
                        <MdGroupAdd
                          style={{
                            fontSize: 14,
                            verticalAlign: "middle",
                            marginRight: 4,
                          }}
                        />
                        <span className="promotionText">{exp.promotion}</span>
                      </div>
                    )}
                    <h4>{exp.company}</h4>
                  </div>
                </div>
                <p>{exp.description}</p>
                <div className="technologies">
                  {exp.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="techTag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
