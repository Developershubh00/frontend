import React from "react";
import ContactUs from "../components/ui/contact/ContactUs";
import { pageSEO } from "../seo/pageSEO";
import SEO from "../seo/SEO";

function ContactUsPage() {
  const seo = pageSEO["/contact-us"];

  return (
    <div>
      <SEO {...seo} />

      <ContactUs />
    </div>
  );
}

export default ContactUsPage;
