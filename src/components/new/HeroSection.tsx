const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#01092d] isolate">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://cdn.dribbble.com/userupload/48906112/file/5b557c635909f4a5154d251429a861a9.mp4"
          // src="https://cdn.dribbble.com/userupload/48906113/file/bc4f018f6478b34278ebec425c8f724f.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-[rgba(1,9,45,0.45)] z-[1]"></div>

      <div className="relative z-[2] w-full max-w-[1250px] mx-auto text-white px-[60px] py-[120px] max-[1024px]:px-[40px] max-[1024px]:py-[90px] max-[568px]:px-[20px] max-[568px]:py-[60px]">
        <h3 className="m-0 text-[32px] leading-[1.2] font-bold max-[868px]:text-[28px] max-[568px]:text-[24px]">
          Your NEET PG Exam Is Over.
        </h3>

        <h1 className="my-[24px] text-[72px] leading-[1.05] tracking-[-3px] font-extrabold text-[#e85002] max-[868px]:text-[52px]">
          Now Every Choice Matters.
        </h1>

        <h4 className="my-[18px] text-[24px] leading-[1.3] font-semibold max-[868px]:text-[20px]">
          Your rank doesn't decide your future.
        </h4>

        <h3 className="m-0 text-[32px] leading-[1.2] font-bold max-[868px]:text-[28px] max-[568px]:text-[24px]">
          Your counselling decisions do.
        </h3>

        <p className="my-[24px] text-[18px] leading-[1.7] text-white max-[868px]:text-[16px]">
          Choosing the right college is often more important than improving your
          rank by a few hundred places. Every counselling brings new
          opportunities—and one wrong decision can cost you the seat you've
          worked so hard for.
          <br />
          <br />
          At <strong className="text-white">Believers Consultancy</strong>, we help NEET PG aspirants
          make informed, confident counselling decisions using real data,
          previous years' trends, and expert guidance.
        </p>

        <div className="flex items-center justify-center gap-[18px] mt-[40px] max-[568px]:flex-col max-[568px]:items-stretch max-[568px]:gap-[12px] max-[568px]:mt-[30px]">
          <a
            href="#predict-college"
            className="inline-flex items-center justify-center min-h-[54px] px-[28px] rounded-[8px] text-[16px] font-bold no-underline transition-[transform,background,border-color] duration-300 ease-in-out text-white bg-[#e85002] hover:bg-[#ff6415] hover:-translate-y-[3px] max-[568px]:w-full"
          >
            Predict My College
          </a>

          <a
            href="#free-counselling"
            className="inline-flex items-center justify-center min-h-[54px] px-[28px] rounded-[8px] text-[16px] font-bold no-underline transition-[transform,background,border-color] duration-300 ease-in-out text-white border border-[rgba(255,255,255,0.45)] bg-[rgba(255,255,255,0.06)] hover:border-[#0464de] hover:bg-[rgba(255,255,255,0.12)] hover:-translate-y-[3px] max-[568px]:w-full"
          >
            Book Free Counselling
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
