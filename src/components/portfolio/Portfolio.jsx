import React, { useState } from "react";
import Slider from "react-slick";
import portfolioData from "../../data/portfolio.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./portfolio.scss";

const companies = ["all", "interblocks", "multplx", "syscoLabs", "99x"];

const PortfolioCard = ({ project, onClick }) => {
  const imageSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  return (
    <div
      className="portfolioCard"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={(e) => {
        if (e.key === "Enter") onClick();
      }}
      role="button"
    >
      <div className="portfolioImage">
        <Slider {...imageSettings} className="portfolioImageSlider">
          {project.images.map((img, idx) => (
            <div key={idx} className="portfolioImageSlide">
              <img src={img} alt={project.title + " " + (idx + 1)} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="portfolioContent">
        <h3>{project.title}</h3>
        <p className="portfolioDescClamp">{project.description}</p>
        <div className="portfolioTech">
          {project.tech.map((t, i) => (
            <span className="techTag" key={i}>
              {t}
            </span>
          ))}
        </div>
        <div className="portfolioLinks">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolioDemo"
              onClick={(e) => e.stopPropagation()}
            >
              Live Demo
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolioRepo"
              onClick={(e) => e.stopPropagation()}
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const PortfolioModal = ({ project, onClose }) => {
  const imageSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  if (!project) return null;
  return (
    <div className="portfolioModalOverlay" onClick={onClose}>
      <div className="portfolioModal" onClick={(e) => e.stopPropagation()}>
        <button className="portfolioModalClose" onClick={onClose}>
          &times;
        </button>
        <div className="portfolioModalImages">
          <Slider {...imageSettings} className="portfolioModalImageSlider">
            {project.images.map((img, idx) => (
              <div key={idx} className="portfolioImageSlide">
                <img src={img} alt={project.title + " " + (idx + 1)} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="portfolioModalContent">
          <h2>{project.title}</h2>
          <p className="portfolioModalDesc">{project.description}</p>
          <div className="portfolioTech">
            {project.tech.map((t, i) => (
              <span className="techTag" key={i}>
                {t}
              </span>
            ))}
          </div>
          <div className="portfolioLinks">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolioDemo"
              >
                Live Demo
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolioRepo"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [filter, setFilter] = useState("all");
  const [modalProject, setModalProject] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: 2,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          rows: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
  };

  const filteredData =
    filter === "all"
      ? portfolioData
      : portfolioData.filter((item) => item.company === filter);

  return (
    <div className="portfolio">
      <div className="portfolioHeader">
        <h2>Portfolio</h2>
        <p>Some of my featured projects</p>
        <div className="portfolioFilterTabs">
          {companies.map((c) => (
            <button
              key={c}
              className={`portfolioFilterBtn${
                filter === c ? " active" : ""
              }`}
              onClick={() => setFilter(c)}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
      </div>
      <Slider {...settings} className="portfolioGrid">
        {filteredData.map((project, idx) => (
          <PortfolioCard
            project={project}
            key={idx}
            onClick={() => setModalProject(project)}
          />
        ))}
      </Slider>
      {modalProject && (
        <PortfolioModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}
    </div>
  );
};

export default Portfolio;
