import React from "react";
import "./NeetpgHero.css";
import { useNavigate } from "react-router-dom";

const NeetpgHero = () => {
  const navigate = useNavigate();

  return (
    <section className="neetpg-hero">
      <div className="neetpg-hero-blob neetpg-hero-blob-1"></div>
      <div className="neetpg-hero-blob neetpg-hero-blob-2"></div>

      <div className="neetpg-container">
        <div className="neetpg-hero-content">
          <span className="neetpg-hero-tag">NEET PG Counselling</span>

          <h1>
            Make smarter <span>NEET PG</span> counselling decisions with
            confidence
          </h1>

          <p>
            Plan your MD/MS journey using authentic counselling data instead of
            assumptions. Believers Consultancy helps you evaluate colleges,
            specializations, and seat opportunities based on previous allotment
            trends, closing ranks, category-wise eligibility, and real
            counselling insights. Everything you need to build a stronger choice
            list is available in one place.
          </p>

          <div className="neetpg-hero-actions">
            <button
              onClick={() => navigate("/dashboard/neet-pg")}
              className="neetpg-hero-btn"
            >
              Get started - FREE &rarr;
            </button>
          </div>

          <div className="neetpg-hero-note">
            ✓ 100% Free. No subscription. No hidden charges.
          </div>
        </div>

        <div className="neetpg-hero-image">
          <img
            src="https://cdn.dribbble.com/userupload/48966005/file/7793b6ca63d76bc470f066afbf43810d.webp"
            alt="NEET PG Counselling"
          />
        </div>
      </div>
    </section>
  );
};

export default NeetpgHero;
