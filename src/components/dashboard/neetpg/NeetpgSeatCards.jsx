import React from "react";
import { FileText, ExternalLink } from "lucide-react";
import "./NeetpgSeatCards.css";

const NeetpgSeatCards = () => {
  const seatMatrices = [
    {
      title: "Final All India Quota Seats Matrix",
      subtitle: "PG Counselling 2026",
      href: "https://drive.google.com/file/d/1fNQirqUzhQTex9GzyiglXCJvnzoUjmrP/view",
    },
    {
      title: "Final Deemed Seats Matrix",
      subtitle: "PG Counselling 2026",
      href: "https://drive.google.com/file/d/1WI16ykdpwXt-AtsV-mYUwNNkZ8J-ofzs/view",
    },
    {
      title: "Final Seats Matrix DNB",
      subtitle: "PG Counselling 2026",
      href: "https://drive.google.com/file/d/1Ec0r9kco5j98R4f2yW2Fn3dPGN6r5ZCC/view",
    },
    {
      title: "Final Central Internal Quota Seats Matrix",
      subtitle: "PG Counselling 2026",
      href: "https://drive.google.com/file/d/17OXdKYVJK203GLEfi8kpouMviy-om5i0/view",
    },
  ];

  return (
    <section className="neetpg-seat-cards-section">
      <div className="neetpg-seat-cards-header">
        <span className="neetpg-seat-cards-badge">PG Counselling 2026</span>

        <h2 className="neetpg-seat-cards-heading">
          Seat Matrix <span>Documents</span>
        </h2>

        <p className="neetpg-seat-cards-description">
          Access the latest seat matrix documents for PG counselling.
        </p>
      </div>

      <div className="neetpg-seat-cards-grid">
        {seatMatrices.map((seat, index) => (
          <article className="neetpg-seat-card" key={seat.href}>
            <div className="neetpg-seat-card-top">
              <div className="neetpg-seat-card-icon">
                <FileText size={24} />
              </div>

              <span className="neetpg-seat-card-number">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="neetpg-seat-card-title">{seat.title}</h3>

            <p className="neetpg-seat-card-subtitle">{seat.subtitle}</p>

            <a
              href={seat.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${seat.title} ${seat.subtitle}`}
              className="neetpg-seat-card-button"
            >
              View Document
              <ExternalLink size={16} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NeetpgSeatCards;
