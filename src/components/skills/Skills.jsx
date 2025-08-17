import { motion } from "motion/react";
import "./skills.css";

const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend Development",
      skills: [
        { name: "React", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "HTML/CSS", level: 95 },
        { name: "Next.js", level: 80 }
      ]
    },
    {
      category: "Backend Development",
      skills: [
        { name: "Node.js", level: 75 },
        { name: "Express.js", level: 70 },
        { name: "Python", level: 65 },
        { name: "MongoDB", level: 70 },
        { name: "PostgreSQL", level: 65 }
      ]
    },
    {
      category: "Tools & Others",
      skills: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 70 },
        { name: "AWS", level: 65 },
        { name: "Figma", level: 75 },
        { name: "Jest", level: 80 }
      ]
    }
  ];

  const otherSkills = [
    "Responsive Design", "RESTful APIs", "GraphQL", "State Management", 
    "Performance Optimization", "Testing", "CI/CD", "Agile Methodologies",
    "UI/UX Design", "Cross-browser Compatibility", "SEO", "Accessibility"
  ];

  return (
    <div className="skills">
      <div className="skillsContainer">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="skillsHeader"
        >
          <h2>Skills & Expertise</h2>
          <p>Technologies and tools I work with</p>
        </motion.div>

        <div className="skillsContent">
          <div className="skillCategories">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                className="skillCategory"
              >
                <h3>{category.category}</h3>
                <div className="skillBars">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="skillBar">
                      <div className="skillInfo">
                        <span className="skillName">{skill.name}</span>
                        <span className="skillLevel">{skill.level}%</span>
                      </div>
                      <div className="progressBar">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: skillIndex * 0.1 }}
                          className="progressFill"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="otherSkills"
          >
            <h3>Additional Skills</h3>
            <div className="skillTags">
              {otherSkills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="skillTag"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Skills; 