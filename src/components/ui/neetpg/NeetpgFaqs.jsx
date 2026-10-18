import React, { useState } from "react";
import "./NeetpgFaqs.css";
import { FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function NeetpgFaqs() {
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState(0);

  const faqs = [
    {
      question: "When will the NEET PG 2026 application form be released?",
      answer:
        "The NEET PG 2026 application form was released by NBEMS on 1 July 2026, and the registration window remained open until 21 July 2026. Candidates who successfully registered could edit their application details during the correction window, while the Selective Edit Window for correcting deficient photographs, signatures, and thumb impressions is open from 31 July to 10 August 2026 for eligible candidates notified by NBEMS.",
    },
    {
      question: "How do I apply for NEET PG 2026?",
      answer:
        "You can apply online through the official NBEMS website. Register with your basic details, complete the application form, upload the required documents, pay the application fee, and submit the form. Before final submission, review all the information carefully to avoid errors.",
    },
    {
      question:
        "What documents should I keep ready before filling out the application form?",
      answer:
        "Keep your recent passport-size photograph, signature, MBBS qualification details, internship completion information, medical registration certificate, and a valid government-issued ID proof ready. Having these documents prepared in advance makes the registration process faster and smoother.",
    },
    {
      question:
        "What are the photo and signature guidelines for NEET PG registration?",
      answer:
        "Your photograph and signature must meet the specifications mentioned in the official NBEMS information bulletin, including the required dimensions, file size, and format. Uploading images that do not meet these guidelines may lead to rejection of your application.",
    },
    {
      question: "What should I do if my photo or signature is rejected?",
      answer:
        "If your uploaded image does not meet the prescribed specifications, NBEMS generally provides a correction window where eligible candidates can upload a fresh photograph or signature. Always follow the official image guidelines while re-uploading your documents.",
    },
    {
      question:
        "Can I correct mistakes after submitting the NEET PG application form?",
      answer:
        "Yes. NBEMS usually opens an application correction window after the registration period ends. During this period, candidates can edit certain details as permitted by the board. It is still advisable to verify all information carefully before submitting the application.",
    },
    {
      question:
        "Which details usually cannot be changed during the correction window?",
      answer:
        "Some personal details, such as your name, registered email ID, mobile number, nationality, and other key information, may not be editable after submission. Since editable fields can vary each year, always refer to the latest NBEMS notification for confirmation.",
    },
    {
      question:
        "What should I do if my payment fails but the amount is deducted?",
      answer:
        "If the payment amount is deducted but your application is not updated, wait for the payment status to refresh. In most cases, the amount is either adjusted or refunded automatically. If the issue persists, contact NBEMS through the official helpdesk before attempting another payment.",
    },
    {
      question:
        "How can I confirm that my NEET PG application has been submitted successfully?",
      answer:
        "Once your application is successfully submitted, a confirmation page and application ID will be generated. Download and save the confirmation page, and keep a copy for future reference throughout the admission process.",
    },
    {
      question: "What if I forget my NEET PG application number?",
      answer:
        'If you misplace your application number, you can retrieve it using the "Forgot Application Number" option available on the official login page. You may need your registered email ID, mobile number, or other details to recover your account.',
    },
    {
      question: "Is it better to apply early or wait until the last date?",
      answer:
        "It is always recommended to apply as early as possible. Early registration helps you avoid last-minute technical issues, gives you enough time to review your application, and reduces the chances of making errors during the submission process.",
    },
    {
      question: "When will the NEET PG 2026 admit card be released?",
      answer:
        "NBEMS releases the NEET PG admit card online a few days before the examination through its official website. Candidates should download it as soon as it becomes available and carefully verify all the details mentioned on it.",
    },
    {
      question:
        "What should I do if there is an error in my NEET PG admit card?",
      answer:
        "If you notice any incorrect information on your admit card, such as your name, photograph, or exam details, contact the NBEMS helpdesk immediately through the official communication channels. Reporting the issue early helps ensure it is resolved before the examination.",
    },
    {
      question: "Which documents should I carry to the NEET PG exam centre?",
      answer:
        "Candidates must carry a printed copy of their admit card along with a valid original photo ID, such as an Aadhaar Card, PAN Card, Passport, Voter ID, or Driving Licence. It is also advisable to follow any additional instructions mentioned in the official admit card.",
    },
    {
      question:
        "Can I change my NEET PG exam centre after submitting the application?",
      answer:
        "Generally, the selected exam city cannot be changed after the application is submitted. However, if NBEMS opens a correction or edit window allowing exam city changes, eligible candidates can update their preferences according to the official guidelines.",
    },
    {
      question: "What should I do after the NEET PG result is declared?",
      answer:
        "After the results are announced, download your scorecard and start preparing for the counselling process. Research colleges, compare specialties, understand the counselling schedule, and keep all the required documents ready for MCC and State counselling.",
    },
    {
      question: "Which documents are required for NEET PG counselling?",
      answer:
        "Candidates are generally required to carry their NEET PG scorecard, admit card, MBBS degree certificate, internship completion certificate, permanent or provisional registration certificate, valid photo ID, and category or EWS certificate (if applicable). Always verify the latest document list before counselling.",
    },
    {
      question: "How can I check previous years' NEET PG closing ranks?",
      answer:
        "Previous years' closing ranks help you understand admission trends and estimate your chances of getting a particular college or specialty. You can access verified closing rank data through Believers Consultancy to make more informed counselling decisions.",
    },
    {
      question: "How can I compare college fees, stipend, and bond details?",
      answer:
        "Before filling your counselling choices, compare important factors such as tuition fees, stipend, service bond, hostel charges, and other financial commitments. The Fees, Stipend & Bond section on Believers Consultancy brings all this information together, making college comparison much easier.",
    },
    {
      question:
        "I'm confused about choosing the right college. Where can I get guidance?",
      answer:
        "Choosing the right college involves more than just your NEET PG rank. Factors like clinical exposure, faculty, location, bond policy, and future career opportunities also matter. If you're unsure, Believers Consultancy offers personalized counselling to help you make informed choices based on your rank and preferences.",
    },
    {
      question:
        "Why should I choose Believers Consultancy for NEET PG counselling?",
      answer:
        "Believers Consultancy simplifies the counselling process by providing verified college data, previous years' closing ranks, fee and bond comparisons, and personalized guidance. Whether you're selecting colleges or planning your choice filling strategy, expert support can help you make confident and well-informed decisions.",
    },
  ];

  return (
    <section className="pg-faq-section">
      <div className="pg-faq-container">
        <div className="pg-faq-header">
          <h2>Frequently Asked Questions</h2>

          <p>Everything you need to know about NEET PG counselling.</p>
        </div>

        <div className="pg-faq-list">
          {faqs.map((faq, index) => (
            <div
              className={`pg-faq-card ${activeFAQ === index ? "active" : ""}`}
              key={index}
            >
              <button
                className="pg-faq-question"
                onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
              >
                <div className="pg-faq-left">
                  <span className="pg-faq-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{faq.question}</h3>
                </div>

                <div className="pg-faq-icon">
                  {activeFAQ === index ? <FiMinus /> : <FiPlus />}
                </div>
              </button>

              <div
                className={`pg-faq-answer ${activeFAQ === index ? "show" : ""}`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pg-faq-cta">
          <div className="pg-faq-cta-content">
            <h2>Start Your NEET PG Journey</h2>

            <p>Everything is FREE | No subscriptions | No catch</p>

            <button
              onClick={() => navigate("/dashboard/neet-pg")}
              className="pg-faq-cta-btn"
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

export default NeetpgFaqs;
