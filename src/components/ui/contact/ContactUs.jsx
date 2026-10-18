import React, { useRef } from "react";
import "./ContactUs.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const ContactUs = () => {
  const sectionRef = useRef();

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(q(".contact-tag"), {
        opacity: 0,
        y: 12,
        duration: 0.3,
      })
        .from(
          q(".contact-heading"),
          {
            opacity: 0,
            y: 25,
            duration: 0.45,
          },
          "-=0.1",
        )
        .from(
          q(".contact-subtitle"),
          {
            opacity: 0,
            y: 20,
            duration: 0.4,
          },
          "-=0.25",
        )
        .from(
          q(".contact-card"),
          {
            opacity: 0,
            y: 35,
            scale: 0.92,
            stagger: 0.06,
            duration: 0.42,
            ease: "back.out(2)",
            clearProps: "all",
          },
          "-=0.15",
        )
        .from(
          q(".contact-whatsapp-box"),
          {
            opacity: 0,
            y: 30,
            scale: 0.98,
            duration: 0.45,
            ease: "power2.out",
            clearProps: "all",
          },
          "-=0.1",
        );

      // Floating background
      gsap.to(q(".one"), {
        x: 30,
        y: -25,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(q(".two"), {
        x: -25,
        y: 30,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(q(".three"), {
        x: 20,
        y: -20,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // WhatsApp arrow animation
      gsap.to(q(".contact-whatsapp-btn svg"), {
        x: 6,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Button pulse
      gsap.to(q(".contact-whatsapp-btn"), {
        scale: 1.03,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section className="contact-section" ref={sectionRef}>
      <div className="contact-floating-circle contact-one"></div>
      <div className="contact-floating-circle contact-two"></div>
      <div className="contact-floating-circle contact-three"></div>

      <div className="contact-container">
        <h2 className="contact-heading">We're Here to Help</h2>

        <p className="contact-subtitle">
          Get instant support for all your medical Counselling queries
        </p>

        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-item">
              <div className="contact-icon-box">
                <FaPhoneAlt />
              </div>

              <div>
                <h3>Phone</h3>
                <a href="tel:+919211724969">+91 9211724969</a>
              </div>
            </div>

            <div className="contact-divider"></div>

            <div className="contact-item">
              <div className="contact-icon-box">
                <FaInstagram />
              </div>

              <div>
                <h3>Follow Us</h3>

                <div className="contact-social-row">
                  <a
                    href="https://www.instagram.com/believers.medcounselling"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-social-btn contact-instagram"
                  >
                    <FaInstagram />
                    <p>Instagram</p>
                  </a>

                  <a
                    href="https://www.youtube.com/@BelieversConsultancy"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-social-btn contact-youtube"
                  >
                    <FaYoutube />
                    <p>YouTube</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Office Card */}
          <div className="contact-card">
            <div className="contact-item">
              <div className="contact-icon-box">
                <FaClock />
              </div>

              <div>
                <h3>Office Hours</h3>
                <p>Monday - Saturday</p>
                <p>10:00 AM - 7:00 PM</p>
                <p>Sunday Closed</p>
              </div>
            </div>

            <div className="contact-divider"></div>

            <div className="contact-item">
              <div className="contact-icon-box">
                <FaEnvelope />
              </div>

              <div>
                <h3>Email</h3>

                <a href="mailto:contact@believersconsultancy.com">
                  contact@believersconsultancy.com
                </a>

                <span>Response within 24 hours</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-whatsapp-box">
          <div className="contact-whatsapp-content">
            <div className="contact-whatsapp-icon">
              <FaWhatsapp />
            </div>

            <div>
              <h3>Need Instant Help?</h3>

              <p>
                Chat with our Counselling experts on WhatsApp for immediate
                assistance with your medical career queries.
              </p>

              <small>
                Available Mon-Sat: 10 AM - 7 PM · Quick response guaranteed
              </small>
            </div>
          </div>

          <a
            href="https://wa.me/919211724969"
            target="_blank"
            rel="noreferrer"
            className="contact-whatsapp-btn"
          >
            Start WhatsApp Chat
            <BsArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
