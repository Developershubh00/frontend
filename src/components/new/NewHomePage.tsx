import HeroSection from "./HeroSection";
import MentorSection from "./MentorSection";
import EverythingSection from "./EverythingSection";
import Chaos from "./Chaos";
import BelieversSections from "./BelieversSections";

function NewHomePage() {
  return (
    <div>
      <HeroSection />
      <MentorSection />
      <EverythingSection />
      {/* <Chaos /> */}
      <BelieversSections />
    </div>
    // gsap installed
  );
}

export default NewHomePage;
