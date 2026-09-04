import HeroSection from "./HeroSection";
import MentorSection from "./MentorSection";
import EverythingSection from "./EverythingSection";
import RankDecision from "./RankDecision";
import WhyBelievers from "./WhyBelievers";
import DataAdvantage from "./DataAdvantage";
import FindCollegesSection from "./FindCollegesSection";
import BelieversSections from "./BelieversSections";

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
      <BelieversSections />
    </div>
  );
}

export default NewHomePage;
