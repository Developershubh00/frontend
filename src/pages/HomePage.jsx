import React from "react";
import WhyBelievers from "../components/ui/home/WhyBelievers";
import DataAdvantage from "../components/ui/home/DataAdvantage";
import FindCollegesSection from "../components/ui/home/FindCollegesSection";
import CounsellingJourney from "../components/ui/home/CounsellingJourney";
import FreeResourcesSection from "../components/ui/home/FreeResourcesSection";
import CorePromise from "../components/ui/home/CorePromise";
import FinalCTA from "../components/ui/home/FinalCTA";
import LightBackground from "../components/ui/home/LightBackground";
import { pageSEO } from "../seo/pageSEO";
import SEO from "../seo/SEO";

function HomePage() {
  const seo = pageSEO["/"];

  return (
    <div>
      <SEO {...seo} />

      <LightBackground />
      <WhyBelievers />
      <DataAdvantage />
      <FindCollegesSection />
      <CounsellingJourney />
      <FreeResourcesSection />
      <CorePromise />
      <FinalCTA />
    </div>
  );
}

export default HomePage;
