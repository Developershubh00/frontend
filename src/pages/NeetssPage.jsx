import React from "react";
import NeetssHero from "../components/ui/neetss/NeetssHero";
import NeetssFeatures from "../components/ui/neetss/NeetssFeatures";
import NeetssOverview from "../components/ui/neetss/NeetssOverview";
import NeetssFaqs from "../components/ui/neetss/NeetssFaqs";
import { pageSEO } from "../seo/pageSEO";
import SEO from "../seo/SEO";

function NeetssPage() {
  const seo = pageSEO["/neet-ss"];

  return (
    <div>
      <SEO {...seo} />

      <NeetssHero />
      <NeetssFeatures />
      <NeetssOverview />
      <NeetssFaqs />
    </div>
  );
}

export default NeetssPage;
