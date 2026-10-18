import React from "react";
import Careers from "../components/ui/careers/Careers";
import { pageSEO } from "../seo/pageSEO";
import SEO from "../seo/SEO";

function CareersPage() {
  const seo = pageSEO["/careers"];

  return (
    <div>
      <SEO {...seo} />

      <Careers />
    </div>
  );
}

export default CareersPage;
