import { motion } from "motion/react";
import "./experience.css";

const Experience = () => {
  const experiences = [
    {
      year: "2023 DEC - Present",
      title: "Senior Technical Lead",
      company: "99x Technology",
      logo: "/99x-logo.png",
      description: "Led the frontend transformation by developing a serverless, scalable solutions using cutting edge technologies. Drove innovation by building a reusable component library and Micro-Frontend architecture, while ensuring alignment with business goals through efficient CI/CD processes and mentoring developers.",
      technologies: ["React", "TypeScript", "Redux", "Next.js"]
    },
    {
      year: "2022 JAN - 2023 DEC",
      title: "Lead - UI Engineering",
      company: "Mad Mobile",
      logo: "/madmobile-logo.png",
      description: "Led the development of high-performance, scalable front-end solutions, optimizing React components for speed and user experience. Drove the adoption of configuration-driven design, created prototypes, and promoted best practices in UI development and code quality. Collaborated in agile teams, ensuring efficient testing and seamless integration across products.",
      technologies: ["React", "JavaScript", "CSS3", "Node.js"]
    },
    {
      year: "2014 MAY - 2022 JAN",
      title: "Associate UI Specialist",
      company: "Sysco Labs Sri Lanka",
      logo: "/syscolabs-logo.png",
      description: "Built user interfaces and implemented responsive designs. Learned modern development practices and tools.",
      technologies: ["HTML", "CSS", "JavaScript", "React"]
    },
    {
      year: "2012 JUL - 2014 MAR",
      title: "Software & UI Engineer",
      company: "Multplx (Pvt) Ltd",
      logo: "/multplx-logo.png",
      description: "Assisted in website development and maintenance. Gained hands-on experience with various web technologies.",
      technologies: ["HTML", "CSS", "JavaScript", "React"]
    },
    {
      year: "2011 FEB - 2012 JUL",
      title: "Software Engineer",
      company: "Interblocks (Pvt) Ltd",
      logo: "/multplx-logo.png",
      description: "Assisted in website development and maintenance. Gained hands-on experience with various web technologies.",
      technologies: ["HTML", "CSS", "JavaScript", "React"]
    }
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
              className={`timelineItem ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className="timelineContent">
                <div className="timelineYear">{exp.year}</div>
                <div className="jobHeader">
                  <div className="companyLogo">
                    <img src={exp.logo} alt={`${exp.company} logo`} />
                  </div>
                  <div className="jobInfo">
                    <h3>{exp.title}</h3>
                    <h4>{exp.company}</h4>
                  </div>
                </div>
                <p>{exp.description}</p>
                <div className="technologies">
                  {exp.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="techTag">{tech}</span>
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