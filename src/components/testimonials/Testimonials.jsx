import React from "react";
import Slider from "react-slick";
import "./testimonials.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import testimonials from "../../data/testimonialsData";

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
