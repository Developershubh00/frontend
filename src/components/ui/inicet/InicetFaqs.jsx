import React, { useState } from "react";
import "./InicetFaqs.css";
import { FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function InicetFaqs() {
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState(0);

  const faqs = [
    {
      question: "What is INICET counselling?",
      answer:
        "INICET counselling is conducted by AIIMS New Delhi for allotment of PG medical seats at Institutes of National Importance - AIIMS (all campuses), JIPMER, NIMHANS, PGIMER, and SCTIMST. It's a centralised, highly competitive process with limited seats.",
    },
    {
      question: "How many INICET sessions are held per year?",
      answer:
        "INICET is typically held twice a year - January and May sessions. Each session has its own cut-offs, seat matrix, and counselling schedule.",
    },
    {
      question: "What happens if I don't participate in a counselling round?",
      answer:
        "Candidates must actively participate in each round. If you've been allotted a seat and don't join or report, you may forfeit the seat and face restrictions in subsequent rounds. Believers Consultancy keeps you updated on all deadlines.",
    },
    {
      question: "Can I appear in both INICET and NEET PG counselling?",
      answer:
        "Yes, INICET and NEET PG are separate exams and separate counselling processes. Candidates can appear in both and choose the best available seat. However, once you join an institute, specific rules about resignation and participation in other counsellings apply.",
    },
    {
      question: "Is Believers Consultancy free for INICET data?",
      answer:
        "Yes! All INICET data including cut-offs, seat matrices, allotment results, institute-wise data, and choice list tools are completely free. Just create an account to access everything.",
    },
  ];

  return (
    <section className="inicet-faq-section">
      <div className="inicet-faq-container">
        <div className="inicet-faq-header">
          <h2>Frequently Asked Questions</h2>

          <p>Everything you need to know about INICET counselling.</p>
        </div>

        <div className="inicet-faq-list">
          {faqs.map((faq, index) => (
            <div
              className={`inicet-faq-card ${activeFAQ === index ? "active" : ""}`}
              key={index}
            >
              <button
                className="inicet-faq-question"
                onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
              >
                <div className="inicet-faq-left">
                  <span className="inicet-faq-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{faq.question}</h3>
                </div>

                <div className="inicet-faq-icon">
                  {activeFAQ === index ? <FiMinus /> : <FiPlus />}
                </div>
              </button>

              <div
                className={`inicet-faq-answer ${activeFAQ === index ? "show" : ""}`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="inicet-faq-cta">
          <div className="inicet-faq-cta-content">
            <h2>Start Your INICET Journey</h2>

            <p>Everything is FREE | No subscriptions | No catch</p>

            <button
              onClick={() => navigate("/dashboard/inicet")}
              className="inicet-faq-cta-btn"
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

export default InicetFaqs;
