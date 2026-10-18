import React, { useState } from "react";
import "./HomeFaqs.css";
import { FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function HomeFaqs() {
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState(0);

  const faqs = [
    {
      question: "What is Believers Consultancy?",
      answer:
        "Believers Consultancy is a dedicated counselling service provider specializing in free guidance for NEET UG and PG aspirants. Our mission is to help medical entrance exam qualified students navigate the complex counselling process and secure admission in their preferred medical colleges across India.",
    },
    {
      question: "Why do you provide free counselling services?",
      answer:
        "Our data is sourced directly from official counselling authorities and updated in real-time. We maintain 99%+ accuracy and cross-verify all information through multiple official channels.",
    },
    {
      question: "Is this completely free? Are there any hidden charges?",
      answer:
        "Absolutely! Believers Consultancy is 100% free. Just create an account and access all features, tools, and resources without any payment or subscription required. No hidden charges, no premium plans - everything is FREE!",
    },
    {
      question: "Who conducts NEET UG counselling?",
      answer:
        "NEET UG counselling is conducted at two levels: Central Level: Medical Counselling Committee (MCC) conducts counselling for 15% All India Quota (AIQ) seats and 100% seats in deemed/central universities. State Level: Individual state authorities conduct counselling for 85% state quota seats.",
    },
    {
      question:
        "How is Believers Consultancy useful if I've already started counselling?",
      answer:
        "Even mid-counselling, our tools help you make better choices in subsequent rounds, understand upgrade possibilities, calculate financial implications, and avoid common mistakes that could cost you your preferred seat.",
    },
    {
      question: "How many rounds of NEET UG counselling are there?",
      answer:
        "NEET UG counselling typically consists of (Round 1 / Round 2 / Round 3 / Mop-up Round / Stray Vacancy Round (if required)). Each round provides opportunities for seat allotment and upgradation.",
    },
    {
      question: "Can I participate in both AIQ and State Quota counselling?",
      answer:
        "Yes, eligible candidates can participate in both AIQ and State Quota counselling simultaneously. However, you need to register separately for each counselling process.",
    },
  ];

  return (
    <section className="home-faq-section">
      <div className="home-faq-container">
        <div className="home-faq-header">
          <h2>Frequently Asked Questions</h2>

          <p>Here are some answers to questions you might be looking for.</p>
        </div>

        <div className="home-faq-list">
          {faqs.map((faq, index) => (
            <div
              className={`home-faq-card ${activeFAQ === index ? "active" : ""}`}
              key={index}
            >
              <button
                className="home-faq-question"
                onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
              >
                <div className="home-faq-left">
                  <span className="home-faq-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{faq.question}</h3>
                </div>

                <div className="home-faq-icon">
                  {activeFAQ === index ? <FiMinus /> : <FiPlus />}
                </div>
              </button>

              <div
                className={`home-faq-answer ${
                  activeFAQ === index ? "show" : ""
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="home-faq-cta">
          <div className="home-faq-cta-content">
            <h2>Take Control Today</h2>

            <p>
              Stop guessing. Start planning with clarity and confidence.
              Everything is FREE!
            </p>

            <button
              onClick={() => navigate("/login")}
              className="home-faq-cta-btn"
            >
              <span>Get started - FREE Access</span>
              <FiArrowRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeFaqs;
