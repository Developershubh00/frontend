import React from "react";
import NeetpgDashboardHero from "../../components/dashboard/neetpg/NeetpgDashboardHero";
import NeetpgSeatCards from "../../components/dashboard/neetpg/NeetpgSeatCards";
import NeetpgPredictorCTA from "../../components/dashboard/neetpg/NeetpgPredictorCTA";
import NeetpgUpdates from "../../components/dashboard/neetpg/NeetpgUpdates";
import NeetpgDataInsights from "../../components/dashboard/neetpg/NeetpgDataInsights";
import NeetpgCounsellingInfo from "../../components/dashboard/neetpg/NeetpgCounsellingInfo";

function NeetpgDashboard() {
  return (
    <div>
      <NeetpgDashboardHero />
      <NeetpgSeatCards />
      <NeetpgPredictorCTA />
      <NeetpgUpdates />
      <NeetpgDataInsights />
      <NeetpgCounsellingInfo />
    </div>
  );
}

export default NeetpgDashboard;
