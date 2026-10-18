import React from "react";
import "./LightBackground.css";
import HeroSection from "./HeroSection";
import MentorSection from "./MentorSection";
import EverythingSection from "./EverythingSection";
import WhatBelievers from "./WhatBelievers";

const LightBackground = () => {
  return (
    <main className="animated-page">
      {/* One continuous background spanning all sections below */}
      <div className="animated-bg">
        <div className="animated-bg__blob animated-bg__blob--navy" />
        <div className="animated-bg__blob animated-bg__blob--blue" />
        <div className="animated-bg__blob animated-bg__blob--blue-2" />
        <div className="animated-bg__blob animated-bg__blob--grey" />
        <div className="animated-bg__blob animated-bg__blob--white" />
      </div>

      <section className="page-section">
        <HeroSection />
      </section>

      <section className="page-section">
        <MentorSection />
      </section>

      <section className="page-section">
        <EverythingSection />
      </section>

      <section className="page-section">
        <WhatBelievers />
      </section>
    </main>
  );
};

export default LightBackground;
