import React from "react";
import "./NeetugHero.css";
import { useNavigate } from "react-router-dom";

const NeetugHero = () => {
  const navigate = useNavigate();

  return (
    <section className="neetug-hero">
      <div className="neetug-hero-blob neetug-hero-blob-1"></div>
      <div className="neetug-hero-blob neetug-hero-blob-2"></div>

      <div className="neetug-container">
        <div className="neetug-hero-content">
          <span className="neetug-hero-tag">NEET UG Counselling</span>

          <h1>
            Turn your <span>NEET UG</span> rank into the best medical college
            opportunity
          </h1>

          <p>
            Make informed MBBS and BDS counselling decisions with reliable data
            and intelligent planning tools. ZyNerd simplifies the entire NEET UG
            counselling journey by helping you evaluate colleges based on your
            rank, category, and preferences. Explore previous years' closing
            ranks, live seat availability, college details, fee structures, and
            admission trends-all in one place. Whether your goal is a government
            medical college, a private institution, or a deemed university, our
            platform gives you the confidence to build the right choice list and
            maximize your admission chances.
          </p>

          <div className="neetug-hero-actions">
            <button
              onClick={() => navigate("/dashboard/neet-ug")}
              className="neetug-hero-btn"
            >
              Get started - FREE &rarr;
            </button>
          </div>

          <div className="neetug-hero-note">
            ✓ 100% Free. No subscription. No hidden charges.
          </div>
        </div>

        <div className="neetug-hero-image">
          <img
            src="https://cdn.dribbble.com/userupload/48966075/file/32e62783f908d05c0e5ceade7d44900c.webp"
            alt="NEET UG Counselling"
          />
        </div>
      </div>
    </section>
  );
};

export default NeetugHero;
