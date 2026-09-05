import Navbar from "./Navbar";
import WhyBelievers from "./WhyBelievers";
import DataAdvantage from "./DataAdvantage";
import FindCollegesSection from "./FindCollegesSection";
import CounsellingJourney from "./CounsellingJourney";
import FreeResourcesSection from "./FreeResourcesSection";
import CorePromise from "./CorePromise";
import FinalCTA from "./FinalCTA";
import LightBackground from "./LightBackground";

function NewHomePage() {
  return (
    <div>
      <Navbar />
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

export default NewHomePage;
