import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./events.scss";

const events = [
  {
    title: "Optimizing Amazon Web Services (AWS) Lambda",
    subtitle: "Soundbites Volume 1 • 99x",
    date: "Internal Tech Talk",
    description:
      "A practical session on improving Lambda performance, reducing cold starts, and applying production-ready tuning strategies for serverless workloads.",
    details:
      "This session focused on how teams can make serverless systems more resilient, cost-efficient, and production-ready. We explored cold-start reduction, event-driven optimizations, observability patterns, and practical tuning decisions for AWS Lambda workloads in real product environments.",
    tags: ["AWS Lambda", "Serverless", "Performance", "Cloud"],
    images: [
      "https://media.licdn.com/dms/image/v2/D5622AQGq9DduDIVovA/feedshare-shrink_480/B56aB5ZE7IIsAg-/0/1788743013253?e=1793836800&v=beta&t=RO5-fzuRfn3O1byPLR4td7f1U0sOLBmh4Qp4zLbw8-Y",
      "https://media.licdn.com/dms/image/v2/D5622AQECBOmIm4hpyQ/feedshare-shrink_480/B56aB5ZFS5JIAg-/0/1788743014729?e=1793836800&v=beta&t=VgBphc2ag1-au9xh6ixvp2MACXvPIof11gwi3DbxViA",
      "https://media.licdn.com/dms/image/v2/D5622AQFuNmzbd_ehmA/feedshare-shrink_480/B56aB5ZEKlKAAg-/0/1788743009401?e=1793836800&v=beta&t=e1pUWuCIT-0IRZW7gUa86rBjjgiEYNhIYVzFJP9O2co",
    ],
    link: "https://medium.com/@abhimanranaweera/optimizing-aws-lambda-for-performance-cost-and-scalability-4e23c0bf4f85",
    linkLabel: "Read the Medium Article",
  },
  {
    title: "Micro-Frontend Architecture in Practice",
    subtitle: "99x Tech Masters",
    date: "Knowledge Sharing Session",
    description:
      "A deep dive into micro-frontend scaling, module federation, cross-boundary integration, and domain-driven architecture patterns for modern product teams.",
    details:
      "This talk unpacked the trade-offs of micro-frontend adoption, how to define ownership boundaries, and when to introduce modular architecture at scale. The focus was on team autonomy, shared standards, and long-term maintainability across multiple frontend domains.",
    tags: ["Micro Frontends", "Module Federation", "Architecture", "Scaling"],
    images: [
      "https://media.licdn.com/dms/image/v2/D5622AQF-VkoIFT29Gw/feedshare-shrink_800/B56Z.V7wtmIUAc-/0/1784926900375?e=1793836800&v=beta&t=ZGl-Pc5ONx-qowXlGu3a_QDO27X31mhMHDolKbk0fS8",
      "https://media.licdn.com/dms/image/v2/D5622AQEiM-g-cRC-5Q/feedshare-shrink_1280/B56Z.V7vrmGcAM-/0/1784926895402?e=1793836800&v=beta&t=gqvi37HdiEgbK5eJuUFlVuyc_zOpfOGTpBBohw07w0w",
      "https://media.licdn.com/dms/image/v2/D5622AQGEI63ZRMlK9w/feedshare-shrink_480/B56Z.V7w.2KEAk-/0/1784926901439?e=1793836800&v=beta&t=1s7E7FG1bkpVe2ykcNBBvILTfHhAuTqF8CILRAywwJ4",
      "https://media.licdn.com/dms/image/v2/D5622AQFGng-YksRiAw/feedshare-shrink_1280/B56Z.V7sXFIMAM-/0/1784926881472?e=1793836800&v=beta&t=jrIt7T-mg25sqw1nVTNZHFDSNKwui9LHN8Khl-m2Is4",
      "https://media.licdn.com/dms/image/v2/D5622AQE2K3BHDpFnZw/feedshare-shrink_480/B56Z.V7sj1KEAg-/0/1784926882306?e=1793836800&v=beta&t=JoVLjktkQFAz8j6RfQuk8438uoI5Z9JCi2NlW-GnlEQ",
    ],
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7486526052899639296/",
    linkLabel: "Explore session on LinkedIn",
  },
  {
    title: "Streamlining UI Library Development From Design to Release",
    subtitle: "99x Tech Master Forum • Internal Session",
    date: "Internal Tech Talk",
    description:
      "A practical session on building and operating a scalable UI library from design alignment to release automation, with a focus on collaboration, token synchronization, and CI/CD maturity.",
    details:
      "At 99x, I shared how we approached UI library development as a cross-functional workflow spanning design, engineering, and release operations. The discussion covered the pain points of fragmented design-to-dev handoff, how Radix UI can help reduce custom implementation overhead, and how design tokens plus automated release practices make the whole system more scalable and maintainable.\n\nThe session also linked directly to my Medium article series on the same topic, covering:\n• understanding UI library architecture and common challenges\n• bridging design and development with token synchronization\n• CI/CD and semantic versioning for reliable release workflows",
    tags: ["UI Library", "Design Systems", "CI/CD", "Semantic Versioning"],
    images: [
      "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*8xAAL6ZbRjLUhpcMNVHEvg.png",
    ],
    link: "https://medium.com/front-end-weekly/streamlining-ui-library-development-from-design-to-release-5fd4f888510a",
    linkLabel: "Read Medium Article Series",
  },
];

const EventCard = ({ event, onClick }) => {
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
    <article
      className="event-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="event-image">
        <Slider {...imageSettings} className="event-image-slider">
          {event.images.map((img, idx) => (
            <div key={`${event.title}-${idx}`} className="event-image-slide">
              <img src={img} alt={`${event.title} ${idx + 1}`} />
            </div>
          ))}
        </Slider>
        <div className="event-image-overlay">
          <span className="event-badge">{event.date}</span>
          <span className="event-company">{event.subtitle}</span>
        </div>
      </div>

      <div className="event-content">
        <h3>{event.title}</h3>
        <p>{event.description}</p>

        <div className="event-tags">
          {event.tags.map((tag) => (
            <span key={tag} className="event-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="event-actions">
          <button type="button" className="event-link event-view-more">
            View details
          </button>
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="event-link"
            onClick={(e) => e.stopPropagation()}
          >
            {event.linkLabel}
          </a>
        </div>
      </div>
    </article>
  );
};

const EventModal = ({ event, onClose }) => {
  const imageSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  if (!event) return null;

  return (
    <div className="event-modal-overlay" onClick={onClose}>
      <div className="event-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="event-modal-close"
          onClick={onClose}
          aria-label="Close details"
        >
          &times;
        </button>

        <div className="event-modal-images">
          <Slider {...imageSettings} className="event-modal-image-slider">
            {event.images.map((img, idx) => (
              <div
                key={`${event.title}-modal-${idx}`}
                className="event-image-slide"
              >
                <img src={img} alt={`${event.title} ${idx + 1}`} />
              </div>
            ))}
          </Slider>
        </div>

        <div className="event-modal-content">
          <span className="event-modal-badge">{event.date}</span>
          <h2>{event.title}</h2>
          <p className="event-modal-subtitle">{event.subtitle}</p>
          <p className="event-modal-desc">
            {event.details || event.description}
          </p>

          <div className="event-tags">
            {event.tags.map((tag) => (
              <span key={tag} className="event-tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="event-modal-actions">
            {event.link && (
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="event-modal-link"
              >
                {event.linkLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="events-section" id="events">
      <div className="events-header">
        <p className="events-kicker">Speaking & community</p>
        <h2>Events & Tech Sessions</h2>
      </div>

      <div className="events-slider-wrap">
        <Slider {...settings} className="events-slider">
          {events.map((event) => (
            <EventCard
              key={event.title}
              event={event}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </Slider>
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
};

export default Events;
