import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "./testimonials.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import testimonials from "../../data/testimonialsData";

const getInitialSlidesToShow = () => {
  if (typeof window !== "undefined") {
    if (window.matchMedia("(max-width: 600px)").matches) return 1;
    if (window.matchMedia("(max-width: 1024px)").matches) return 2;
  }
  return 3;
};

const getSettings = (slidesToShow) => ({
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow,
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
});

const Testimonials = () => {
  const sliderRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(getInitialSlidesToShow());

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 600px)").matches) {
        setSlidesToShow(1);
      } else if (window.matchMedia("(max-width: 1024px)").matches) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(0, true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return (
    <section className="testimonials-section" id="testimonials">
      <h2 className="testimonials-title">Testimonials</h2>
      <Slider ref={sliderRef} {...getSettings(slidesToShow)} className="testimonials-carousel">
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
};

export default Testimonials;
