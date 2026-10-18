import React from "react";
import AnnouncementsFeed from "../components/ui/announcements/AnnouncementsFeed";
import { pageSEO } from "../seo/pageSEO";
import SEO from "../seo/SEO";

function AnnouncementsPage() {
  const seo = pageSEO["/announcements"];

  return (
    <div>
      <SEO {...seo} />

      <AnnouncementsFeed />
    </div>
  );
}

export default AnnouncementsPage;
