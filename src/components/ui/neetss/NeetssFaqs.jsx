import React, { useState } from "react";
import "./NeetssFaqs.css";
import { FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function NeetssFaqs() {
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState(0);

  const faqs = [
    {
      question: "What is NEET SS and who should take it?",
      answer:
        "NEET SS is the super-speciality entrance exam for DM and MCh programmes. Any doctor who has completed or is completing their MD/MS/DNB and wants to pursue a super-speciality (like Cardiology, Neurosurgery, etc.) must appear in NEET SS.",
    },
    {
      question: "How is NEET SS counselling conducted?",
      answer:
        "MCC conducts centralised counselling for AIQ and Deemed/Central institution seats. State authorities handle state quota seats. The process mirrors NEET PG counselling with choice filling, seat allotment, and joining rounds.",
    },
    {
      question: "How competitive is NEET SS compared to NEET PG?",
      answer:
        "NEET SS is extremely competitive — the number of seats is far fewer than NEET PG, and only those who've already cracked MD/MS are eligible. Seats in top super-specialities like DM Cardiology at premier institutes are among the most coveted in Indian medicine.",
    },
    {
      question: "Can I participate in both AIQ and State NEET SS counselling?",
      answer:
        "Yes, eligible candidates can register for both the All India Quota through MCC and their respective state-level counselling simultaneously, subject to eligibility criteria.",
    },
    {
      question: "Is Believers Consultancy free for NEET SS data?",
      answer:
        "Yes! All NEET SS data including cut-offs, seat matrices, institute profiles, and choice list tools are completely free. Just create an account and access everything without any payment.",
    },
  ];

  return (
    <section className="ss-faq-section">
      <div className="ss-faq-container">
        <div className="ss-faq-header">
          <h2>Frequently Asked Questions</h2>

          <p>Everything you need to know about NEET SS counselling.</p>
        </div>

        <div className="ss-faq-list">
          {faqs.map((faq, index) => (
            <div
              className={`ss-faq-card ${activeFAQ === index ? "active" : ""}`}
              key={index}
            >
              <button
                className="ss-faq-question"
                onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
              >
                <div className="ss-faq-left">
                  <span className="ss-faq-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{faq.question}</h3>
                </div>

                <div className="ss-faq-icon">
                  {activeFAQ === index ? <FiMinus /> : <FiPlus />}
                </div>
              </button>

              <div
                className={`ss-faq-answer ${activeFAQ === index ? "show" : ""}`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="ss-faq-cta">
          <div className="ss-faq-cta-content">
            <h2>Start Your NEET SS Journey</h2>

            <p>Everything is FREE | No subscriptions | No catch</p>

            <button
              onClick={() => navigate("/login")}
              className="ss-faq-cta-btn"
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

export default NeetssFaqs;
