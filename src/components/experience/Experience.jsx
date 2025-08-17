import { motion } from "motion/react";
import "./experience.css";

const Experience = () => {
  const experiences = [
    {
      year: "2023 - Present",
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      description: "Leading frontend development team, implementing modern React applications with TypeScript and advanced state management.",
      technologies: ["React", "TypeScript", "Redux", "Next.js"]
    },
    {
      year: "2021 - 2023",
      title: "Frontend Developer",
      company: "Digital Innovations Inc",
      description: "Developed responsive web applications using React and modern CSS frameworks. Collaborated with design and backend teams.",
      technologies: ["React", "JavaScript", "CSS3", "Node.js"]
    },
    {
      year: "2019 - 2021",
      title: "Junior Developer",
      company: "StartupHub",
      description: "Built user interfaces and implemented responsive designs. Learned modern development practices and tools.",
      technologies: ["HTML", "CSS", "JavaScript", "React"]
    },
    {
      year: "2018 - 2019",
      title: "Web Development Intern",
      company: "Creative Agency",
      description: "Assisted in website development and maintenance. Gained hands-on experience with various web technologies.",
      technologies: ["HTML", "CSS", "JavaScript", "WordPress"]
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
          <p>My professional journey in web development</p>
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
                <h3>{exp.title}</h3>
                <h4>{exp.company}</h4>
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