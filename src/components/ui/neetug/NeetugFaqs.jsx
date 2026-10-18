import React, { useState } from "react";
import "./NeetugFaqs.css";
import { FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function NeetugFaqs() {
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState(0);

  const faqs = [
    {
      question: "What is NEET UG counselling?",
      answer:
        "NEET UG counselling is the seat allotment process after NEET UG results. It determines which college and course (MBBS/BDS/AYUSH) you get based on your rank, category, and choice preferences. It's conducted at both national level (MCC for AIQ and Deemed/Central) and state level.",
    },
    {
      question: "What is the difference between AIQ and State Quota?",
      answer:
        "All India Quota (AIQ) covers 15% of Government college seats and 100% of Deemed/Central university seats - conducted by MCC. State Quota covers the remaining 85% of Government college seats and is conducted by individual state counselling authorities. You can participate in both simultaneously.",
    },
    {
      question: "How many rounds does NEET UG counselling have?",
      answer:
        "MCC conducts Round 1, Round 2, Round 3, and a Stray Vacancy Round for AIQ seats. State counselling has its own rounds (varies by state - typically 2–4 rounds plus a mop-up round). Believers Consultancy tracks all rounds in real time.",
    },
    {
      question:
        "Can I participate in both AIQ and State Quota counselling simultaneously?",
      answer:
        "Yes. Eligible candidates can register for both MCC (AIQ) and their respective state counselling at the same time. You need to register and pay the registration fee separately for each.",
    },
    {
      question: "Is Believers Consultancy free for NEET UG data?",
      answer:
        "Yes! All NEET UG data - cut-offs, seat matrices, allotments, college profiles, fee data, and choice list tools - are completely free. Just create an account and access everything without any payment.",
    },
  ];
  return (
    <section className="ug-faq-section">
      <div className="ug-faq-container">
        <div className="ug-faq-header">
          <h2>Frequently Asked Questions</h2>

          <p>Everything you need to know about NEET UG counselling.</p>
        </div>

        <div className="ug-faq-list">
          {faqs.map((faq, index) => (
            <div
              className={`ug-faq-card ${activeFAQ === index ? "active" : ""}`}
              key={index}
            >
              <button
                className="ug-faq-question"
                onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
              >
                <div className="ug-faq-left">
                  <span className="ug-faq-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{faq.question}</h3>
                </div>

                <div className="ug-faq-icon">
                  {activeFAQ === index ? <FiMinus /> : <FiPlus />}
                </div>
              </button>

              <div
                className={`ug-faq-answer ${activeFAQ === index ? "show" : ""}`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="ug-faq-cta">
          <div className="ug-faq-cta-content">
            <h2>Start Your NEET UG Journey</h2>

            <p>Everything is FREE | No subscriptions | No catch</p>

            <button
              onClick={() => navigate("/dashboard/neet-ug")}
              className="ug-faq-cta-btn"
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

export default NeetugFaqs;
