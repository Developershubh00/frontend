import React from "react";
import NeetugHero from "../components/ui/neetug/NeetugHero";
import NeetugFeatures from "../components/ui/neetug/NeetugFeatures";
import NeetugOverview from "../components/ui/neetug/NeetugOverview";
import NeetugFaqs from "../components/ui/neetug/NeetugFaqs";
import { pageSEO } from "../seo/pageSEO";
import SEO from "../seo/SEO";

function NeetugPage() {
  const seo = pageSEO["/neet-ug"];

  return (
    <div>
      <SEO {...seo} />

      <NeetugHero />
      <NeetugFeatures />
      <NeetugOverview />
      <NeetugFaqs />
    </div>
  );
}

export default NeetugPage;
