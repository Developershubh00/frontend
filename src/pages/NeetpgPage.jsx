import React from "react";
import NeetpgHero from "../components/ui/neetpg/NeetpgHero";
import NeetpgFeatures from "../components/ui/neetpg/NeetpgFeatures";
import NeetpgOverview from "../components/ui/neetpg/NeetpgOverview";
import NeetpgFaqs from "../components/ui/neetpg/NeetpgFaqs";
import { pageSEO } from "../seo/pageSEO";
import SEO from "../seo/SEO";

function NeetpgPage() {
  const seo = pageSEO["/neet-pg"];

  return (
    <div>
      <SEO {...seo} />

      <NeetpgHero />
      <NeetpgFeatures />
      <NeetpgOverview />
      <NeetpgFaqs />
    </div>
  );
}

export default NeetpgPage;
