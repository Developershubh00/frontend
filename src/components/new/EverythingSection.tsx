import { useRef } from "react";

const features = [
  {
    number: "01",
    title: "College Predictor",
    description:
      "Estimate the colleges you can realistically expect based on your rank, category and previous counselling trends.",
  },
  {
    number: "02",
    title: "Rank Predictor",
    description:
      "Estimate your expected NEET PG rank using your exam performance.",
  },
  {
    number: "03",
    title: "AIQ Counselling",
    description:
      "Complete guidance for All India Quota counselling—from registration to admission.",
  },
  {
    number: "04",
    title: "State Counselling",
    description:
      "Stay updated with counselling schedules, eligibility criteria and state-specific rules.",
  },
  {
    number: "05",
    title: "Previous Year Closing Ranks",
    description:
      "Understand realistic admission possibilities using verified previous years' data.",
  },
  {
    number: "06",
    title: "College Comparison",
    description:
      "Compare colleges based on academics, fees, stipends, bond conditions and opportunities.",
  },
  {
    number: "07",
    title: "Fee Structure",
    description: "Know the complete fee details before making your choices.",
  },
  {
    number: "08",
    title: "Bond Information",
    description:
      "Understand service bonds, penalties and state obligations before locking your seat.",
  },
  {
    number: "09",
    title: "Stipend Details",
    description: "Compare stipends offered across institutions and states.",
  },
  {
    number: "10",
    title: "Expert Counselling",
    description:
      "Personalized guidance from experienced counselling experts who understand every counselling round.",
  },
];

const EverythingSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "next" | "prev") => {
    if (!carouselRef.current) return;

    const scrollAmount = carouselRef.current.offsetWidth * 0.75;

    carouselRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section>
      <div className="w-full py-[100px] px-[20px] bg-white overflow-hidden max-[1024px]:py-[80px] max-[1024px]:px-[20px] max-[868px]:py-[60px] max-[868px]:px-[16px]">
        <div className="w-full max-w-[1400px] mx-auto">
          <h2 className="text-[42px] text-[#032c7b] mb-[20px] leading-[1.25] max-[868px]:text-[32px]">
            WHAT'S GOING THROUGH
            <br />
            <span className="text-[#0464de]">YOUR MIND RIGHT NOW?</span>
          </h2>
          <div className="inline-block align-middle w-[calc(50%-40px)] max-[1024px]:w-[calc(50%-25px)] max-[868px]:block max-[868px]:w-full">
            <p className="mt-0 mb-[30px] text-[20px] leading-[1.6] font-semibold text-[#3f3f3f] max-[568px]:text-[18px]">
              You've finished your exam... <br /> Now the real questions begin.
            </p>
            <div className="grid grid-cols-1 gap-x-[30px] gap-y-[14px] max-[1024px]:gap-x-[20px] max-[1024px]:gap-y-[12px] max-[868px]:gap-[12px]">
              <p className="relative m-0 pl-[24px] text-[16px] leading-[1.5] text-[#3f3f3f] before:content-['→'] before:absolute before:left-0 before:top-[1px] before:text-[14px] before:font-extrabold before:text-[#032c7b]">
                Can I get MD Medicine?
              </p>
              <p className="relative m-0 pl-[24px] text-[16px] leading-[1.5] text-[#3f3f3f] before:content-['→'] before:absolute before:left-0 before:top-[1px] before:text-[14px] before:font-extrabold before:text-[#032c7b]">
                Can I get Radiology?
              </p>
              <p className="relative m-0 pl-[24px] text-[16px] leading-[1.5] text-[#3f3f3f] before:content-['→'] before:absolute before:left-0 before:top-[1px] before:text-[14px] before:font-extrabold before:text-[#032c7b]">
                Will I get a Government Medical College?
              </p>
              <p className="relative m-0 pl-[24px] text-[16px] leading-[1.5] text-[#3f3f3f] before:content-['→'] before:absolute before:left-0 before:top-[1px] before:text-[14px] before:font-extrabold before:text-[#032c7b]">
                Should I choose DNB?
              </p>
              <p className="relative m-0 pl-[24px] text-[16px] leading-[1.5] text-[#3f3f3f] before:content-['→'] before:absolute before:left-0 before:top-[1px] before:text-[14px] before:font-extrabold before:text-[#032c7b]">
                Should I wait for Round 2?
              </p>
              <p className="relative m-0 pl-[24px] text-[16px] leading-[1.5] text-[#3f3f3f] before:content-['→'] before:absolute before:left-0 before:top-[1px] before:text-[14px] before:font-extrabold before:text-[#032c7b]">
                Is it better to upgrade?
              </p>
              <p className="relative m-0 pl-[24px] text-[16px] leading-[1.5] text-[#3f3f3f] before:content-['→'] before:absolute before:left-0 before:top-[1px] before:text-[14px] before:font-extrabold before:text-[#032c7b]">
                Which college should I fill first?
              </p>
              <p className="relative m-0 pl-[24px] text-[16px] leading-[1.5] text-[#3f3f3f] before:content-['→'] before:absolute before:left-0 before:top-[1px] before:text-[14px] before:font-extrabold before:text-[#032c7b]">
                Which state gives me the best chance?
              </p>
              <p className="relative m-0 pl-[24px] text-[16px] leading-[1.5] text-[#3f3f3f] before:content-['→'] before:absolute before:left-0 before:top-[1px] before:text-[14px] before:font-extrabold before:text-[#032c7b]">
                How many colleges should I list?
              </p>
            </div>
            <p className="mt-[35px] mb-0 pt-[25px] border-t border-[#e2e8f0] text-[18px] leading-[1.7] font-semibold text-[#032c7b] max-[568px]:text-[16px]">
              We've helped students answer these exact questions—with
              confidence, not guesswork.
            </p>
          </div>
          <div className="inline-block align-middle w-[calc(50%-40px)] h-[600px] ml-[70px] overflow-hidden rounded-[24px] max-[1024px]:w-[calc(50%-25px)] max-[1024px]:h-[520px] max-[1024px]:ml-[45px] max-[868px]:block max-[868px]:w-full max-[868px]:h-[450px] max-[868px]:mt-[45px] max-[868px]:ml-0 max-[568px]:h-[350px] max-[568px]:mt-[35px] max-[568px]:rounded-[18px]">
            <img
              src="https://cdn.dribbble.com/userupload/48907217/file/ab6a06e9e7679c7d4c665efa83f7098f.webp"
              alt="Medical counselling"
              className="w-full h-full block object-cover"
            />
          </div>
        </div>
      </div>

      <div className="w-full py-[100px] px-[20px] bg-[#01092d] overflow-hidden max-[1024px]:py-[80px] max-[1024px]:px-[20px] max-[868px]:py-[60px] max-[868px]:px-[16px]">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between gap-[30px] mb-[50px] max-[868px]:items-start max-[868px]:flex-col max-[868px]:mb-[35px]">
            <h2 className="text-[42px] text-[#e85002] mb-[20px] leading-[1.25] max-[868px]:text-[32px]">
              EVERYTHING YOU NEED.
              <br />
              <span className="text-[#0464de]">ALL IN ONE PLACE.</span>
            </h2>

            <div className="flex gap-[10px] flex-shrink-0 max-[868px]:self-end">
              <button
                type="button"
                onClick={() => scroll("prev")}
                aria-label="Previous"
                className="flex items-center justify-center w-[52px] h-[52px] border border-[#d9e0ea] rounded-full bg-white text-[#032c7b] text-[22px] cursor-pointer transition-[background,color,transform] duration-300 ease-in-out hover:bg-[#032c7b] hover:text-white hover:-translate-y-[3px] max-[568px]:w-[46px] max-[568px]:h-[46px]"
              >
                ←
              </button>

              <button
                type="button"
                onClick={() => scroll("next")}
                aria-label="Next"
                className="flex items-center justify-center w-[52px] h-[52px] border border-[#d9e0ea] rounded-full bg-white text-[#032c7b] text-[22px] cursor-pointer transition-[background,color,transform] duration-300 ease-in-out hover:bg-[#032c7b] hover:text-white hover:-translate-y-[3px] max-[568px]:w-[46px] max-[568px]:h-[46px]"
              >
                →
              </button>
            </div>
          </div>

          <div
            className="flex gap-[20px] overflow-x-auto [scroll-snap-type:x_mandatory] [scrollbar-width:none] pb-[10px] [&::-webkit-scrollbar]:hidden"
            ref={carouselRef}
          >
            {features.map((feature) => (
              <article
                className="flex-[0_0_calc(33.333%-14px)] pt-[28px] pr-[30px] pb-[32px] pl-[30px] bg-white [scroll-snap-align:start] flex flex-col justify-between transition-transform duration-[350ms] ease-in-out rounded-[12px_60px_12px_12px] hover:rounded-[12px] max-[1024px]:flex-[0_0_calc(50%-10px)] max-[868px]:flex-[0_0_80%] max-[868px]:min-h-[300px] max-[568px]:flex-[0_0_88%] max-[568px]:min-h-[290px] max-[568px]:p-[24px]"
                key={feature.number}
              >
                <div className="flex items-center gap-[8px] text-[#01092d] text-[16px] leading-none">
                  <span>{feature.number}</span>
                  <span className="w-[38px] h-px bg-[#01092d]"></span>
                </div>

                <div>
                  <h3 className="max-w-[330px] mt-0 mb-[35px] text-[42px] leading-[1.05] tracking-[-1.5px] font-medium text-[#01092d] max-[568px]:text-[22px]">
                    {feature.title}
                  </h3>
                  <p className="max-w-[360px] m-0 text-[17px] leading-[1.5] text-[#3f3f3f]">
                    {feature.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EverythingSection;
