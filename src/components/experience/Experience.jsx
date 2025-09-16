import experiences from "../../data/experiences.json";
import { motion } from "motion/react";
import { MdGroupAdd } from "react-icons/md";
import "./experience.scss";

const Experience = () => {
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
