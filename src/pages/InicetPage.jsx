import React from "react";
import InicetHero from "../components/ui/inicet/InicetHero";
import InicetFeatures from "../components/ui/inicet/InicetFeatures";
import InicetOverview from "../components/ui/inicet/InicetOverview";
import InicetFaqs from "../components/ui/inicet/InicetFaqs";
import { pageSEO } from "../seo/pageSEO";
import SEO from "../seo/SEO";

function InicetPage() {
  const seo = pageSEO["/inicet"];

  return (
    <div>
      <SEO {...seo} />

      <InicetHero />
      <InicetFeatures />
      <InicetOverview />
      <InicetFaqs />
    </div>
  );
}

export default InicetPage;
