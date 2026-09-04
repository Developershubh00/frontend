import HeroSection from "./HeroSection";
import MentorSection from "./MentorSection";
import EverythingSection from "./EverythingSection";
import RankDecision from "./RankDecision";
import WhyBelievers from "./WhyBelievers";
import DataAdvantage from "./DataAdvantage";
import FindCollegesSection from "./FindCollegesSection";
import CounsellingJourney from "./CounsellingJourney";
import FreeResourcesSection from "./FreeResourcesSection";
import CorePromise from "./CorePromise";
import FinalCTA from "./FinalCTA";

function NewHomePage() {
  return (
    <div>
      <HeroSection />
      <MentorSection />
      <EverythingSection />
      <RankDecision />
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
