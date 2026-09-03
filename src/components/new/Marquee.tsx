import { useEffect, useRef } from "react";
import gsap from "gsap";

function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 15,
      repeat: -1,
      ease: "none",
    });

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        tween.timeScale(1);

        gsap.to(".marquee-line img", {
          rotate: 180,
          duration: 0.3,
        });
      } else {
        tween.timeScale(-1);

        gsap.to(".marquee-line img", {
          rotate: 0,
          duration: 0.3,
        });
      }
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      tween.kill();
    };
  }, []);

  return (
    <section className="w-full overflow-hidden py-[2.5rem]">
      <h2 className="text-[42px] font-bold text-center mb-[1rem] text-[#032c7b] max-[868px]:text-[32px]">
        Trusted by thousands of <span className="text-[#0464de]">NEET PG aspirants</span>
      </h2>
      <div className="flex w-max" ref={marqueeRef}>
        {/* FIRST SET */}
        <div className="marquee-line flex-shrink-0 flex items-center gap-[24px] px-[20px] whitespace-nowrap max-[568px]:gap-[20px] max-[568px]:px-[10px]">
          <h3 className="text-[32px] text-[#3f3f3f] max-[568px]:text-[22px]">Expert Counselling</h3>
          <img
            src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
            alt=""
            className="h-[32px] rotate-180 [filter:brightness(0)_saturate(100%)_invert(13%)_sepia(77%)_saturate(2228%)_hue-rotate(213deg)_brightness(88%)_contrast(105%)] max-[568px]:h-[20px]"
          />
        </div>

        <div className="marquee-line flex-shrink-0 flex items-center gap-[24px] px-[20px] whitespace-nowrap max-[568px]:gap-[20px] max-[568px]:px-[10px]">
          <h3 className="text-[32px] text-[#3f3f3f] max-[568px]:text-[22px]">Previous Year Seat Matrix</h3>
          <img
            src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
            alt=""
            className="h-[32px] rotate-180 [filter:brightness(0)_saturate(100%)_invert(13%)_sepia(77%)_saturate(2228%)_hue-rotate(213deg)_brightness(88%)_contrast(105%)] max-[568px]:h-[20px]"
          />
        </div>

        <div className="marquee-line flex-shrink-0 flex items-center gap-[24px] px-[20px] whitespace-nowrap max-[568px]:gap-[20px] max-[568px]:px-[10px]">
          <h3 className="text-[32px] text-[#3f3f3f] max-[568px]:text-[22px]">AIQ & State Counselling Support</h3>
          <img
            src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
            alt=""
            className="h-[32px] rotate-180 [filter:brightness(0)_saturate(100%)_invert(13%)_sepia(77%)_saturate(2228%)_hue-rotate(213deg)_brightness(88%)_contrast(105%)] max-[568px]:h-[20px]"
          />
        </div>

        <div className="marquee-line flex-shrink-0 flex items-center gap-[24px] px-[20px] whitespace-nowrap max-[568px]:gap-[20px] max-[568px]:px-[10px]">
          <h3 className="text-[32px] text-[#3f3f3f] max-[568px]:text-[22px]">College Prediction</h3>
          <img
            src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
            alt=""
            className="h-[32px] rotate-180 [filter:brightness(0)_saturate(100%)_invert(13%)_sepia(77%)_saturate(2228%)_hue-rotate(213deg)_brightness(88%)_contrast(105%)] max-[568px]:h-[20px]"
          />
        </div>

        <div className="marquee-line flex-shrink-0 flex items-center gap-[24px] px-[20px] whitespace-nowrap max-[568px]:gap-[20px] max-[568px]:px-[10px]">
          <h3 className="text-[32px] text-[#3f3f3f] max-[568px]:text-[22px]">Choice Filling Assistance</h3>
          <img
            src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
            alt=""
            className="h-[32px] rotate-180 [filter:brightness(0)_saturate(100%)_invert(13%)_sepia(77%)_saturate(2228%)_hue-rotate(213deg)_brightness(88%)_contrast(105%)] max-[568px]:h-[20px]"
          />
        </div>

        {/* DUPLICATE SET */}
        <div className="marquee-line flex-shrink-0 flex items-center gap-[24px] px-[20px] whitespace-nowrap max-[568px]:gap-[20px] max-[568px]:px-[10px]">
          <h3 className="text-[32px] text-[#3f3f3f] max-[568px]:text-[22px]">Expert Counselling</h3>
          <img
            src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
            alt=""
            className="h-[32px] rotate-180 [filter:brightness(0)_saturate(100%)_invert(13%)_sepia(77%)_saturate(2228%)_hue-rotate(213deg)_brightness(88%)_contrast(105%)] max-[568px]:h-[20px]"
          />
        </div>

        <div className="marquee-line flex-shrink-0 flex items-center gap-[24px] px-[20px] whitespace-nowrap max-[568px]:gap-[20px] max-[568px]:px-[10px]">
          <h3 className="text-[32px] text-[#3f3f3f] max-[568px]:text-[22px]">Previous Year Seat Matrix</h3>
          <img
            src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
            alt=""
            className="h-[32px] rotate-180 [filter:brightness(0)_saturate(100%)_invert(13%)_sepia(77%)_saturate(2228%)_hue-rotate(213deg)_brightness(88%)_contrast(105%)] max-[568px]:h-[20px]"
          />
        </div>

        <div className="marquee-line flex-shrink-0 flex items-center gap-[24px] px-[20px] whitespace-nowrap max-[568px]:gap-[20px] max-[568px]:px-[10px]">
          <h3 className="text-[32px] text-[#3f3f3f] max-[568px]:text-[22px]">AIQ & State Counselling Support</h3>
          <img
            src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
            alt=""
            className="h-[32px] rotate-180 [filter:brightness(0)_saturate(100%)_invert(13%)_sepia(77%)_saturate(2228%)_hue-rotate(213deg)_brightness(88%)_contrast(105%)] max-[568px]:h-[20px]"
          />
        </div>

        <div className="marquee-line flex-shrink-0 flex items-center gap-[24px] px-[20px] whitespace-nowrap max-[568px]:gap-[20px] max-[568px]:px-[10px]">
          <h3 className="text-[32px] text-[#3f3f3f] max-[568px]:text-[22px]">College Prediction</h3>
          <img
            src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
            alt=""
            className="h-[32px] rotate-180 [filter:brightness(0)_saturate(100%)_invert(13%)_sepia(77%)_saturate(2228%)_hue-rotate(213deg)_brightness(88%)_contrast(105%)] max-[568px]:h-[20px]"
          />
        </div>

        <div className="marquee-line flex-shrink-0 flex items-center gap-[24px] px-[20px] whitespace-nowrap max-[568px]:gap-[20px] max-[568px]:px-[10px]">
          <h3 className="text-[32px] text-[#3f3f3f] max-[568px]:text-[22px]">Choice Filling Assistance</h3>
          <img
            src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
            alt=""
            className="h-[32px] rotate-180 [filter:brightness(0)_saturate(100%)_invert(13%)_sepia(77%)_saturate(2228%)_hue-rotate(213deg)_brightness(88%)_contrast(105%)] max-[568px]:h-[20px]"
          />
        </div>
      </div>
    </section>
  );
}

export default Marquee;
