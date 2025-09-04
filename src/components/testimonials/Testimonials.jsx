import React from "react";
import Slider from "react-slick";
import "./testimonials.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Kelum Prasad",
    designation: "Senior Software Engineer, 99x",
    comment:
      "I have worked with Abhiman more than 4 years in two companies. He is a technically sound, result oriented character. His good analytical knowledge, along with the technical knowledge helped us on implementing some cool android based products and web based solutions. And his creativity polished the final product. A team player with great attitudes.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Nadeesha Perera",
    designation: "UI/UX Designer, Interblocks",
    comment:
      "Abhiman is a passionate developer who always delivers on time. His attention to detail and creativity are top notch. He is a great asset to any team.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Sahan Fernando",
    designation: "Tech Lead, MadMobile",
    comment:
      "Working with Abhiman was a pleasure. He is a quick learner and adapts to new technologies easily. Highly recommended!",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Ishara Jayasuriya",
    designation: "Product Manager, Multplx",
    comment:
      "Abhiman's leadership and technical skills are impressive. He always motivates the team and brings out the best in everyone.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Ruwan Dias",
    designation: "DevOps Engineer, SyscoLabs",
    comment:
      "His problem-solving skills and positive attitude make him a valuable team member. Always ready to help and share knowledge.",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  {
    name: "Tharushi Senanayake",
    designation: "Frontend Developer, MadMobile",
    comment:
      "Abhiman is creative, reliable, and always up for a challenge. He brings energy and innovation to every project.",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const Testimonials = () => (
  <section className="testimonials-section" id="testimonials">
    <h2 className="testimonials-title">Testimonials</h2>
    <Slider {...settings} className="testimonials-carousel">
      {testimonials.map((t, idx) => (
        <div className="testimonial-card" key={t.name + idx}>
          <img className="testimonial-img" src={t.image} alt={t.name} />
          <div className="testimonial-content">
            <span className="testimonial-name">{t.name}</span>
            <span className="testimonial-designation">{t.designation}</span>
            <p className="testimonial-comment">{t.comment}</p>
          </div>
        </div>
      ))}
    </Slider>
  </section>
);

export default Testimonials;
