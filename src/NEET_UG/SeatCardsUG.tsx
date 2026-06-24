import React from "react";

type Card = {
  title: string;
  subtitle: string;
  description: string;
  link: string;
  image: string;
};

const cards: Card[] = [
  {
    title: "Round 2 Allotment",
    subtitle: "NEET UG 2025",
    description:
      "Provisional NEET-UG Counselling Seats Allotment 2025 Round 2.",
    link: "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2025/09/20250917581472046.pdf",
    image:
      "https://cdn.dribbble.com/userupload/47071295/file/040a3a45ea53bfa81dc16985a2a64476.jpg",
  },
  {
    title: "Seat Availability",
    subtitle: "UG Medical",
    description: "Seat Matrix for NEET UG (BDS/B.Sc Nursing) - 2025 Round 5.",
    link: "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/2026010176307210.pdf",
    image:
      "https://cdn.dribbble.com/userupload/47071297/file/c5fde57c45ad42f1bb56eb0d94974029.jpg",
  },
  {
    title: "Round 1 Allotment",
    subtitle: "Seat Allotment",
    description:
      "Provisional NEET-UG Counselling Seats Allotment 2025 Round 1.",
    link: "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2025/08/202508121942915214.pdf",
    image:
      "https://cdn.dribbble.com/userupload/47071293/file/028fcce3dee556ff912fc42605f51053.jpg",
  },
  {
    title: "Deemed Seats",
    subtitle: "UG Matrix",
    description: "Final Seat Matrix for Deemed Universities Round 1 UG 2025.",
    link: "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2025/07/2025072244.pdf",
    image:
      "https://cdn.dribbble.com/userupload/47071294/file/7082bdd38df1c81b09c30f0f1f238987.jpg",
  },
  {
    title: "Central Quota",
    subtitle: "Seats Matrix",
    description:
      "Schedule for Online Counselling for NEET-UG 2025 under Central Universities.",
    link: "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2025/09/20250913200172173.pdf",
    image:
      "https://cdn.dribbble.com/userupload/47071296/file/f61c58ceb0fbd75c9a00493d455b363e.jpg",
  },
];

const SeatCardsUG: React.FC = () => {
  return (
    <div className="w-[95%] mx-auto max-w-7xl py-3 lg:py-3 mb-8 lg:mb-12">
      {/* EXAM NOTICE / HEADING */}
      <h1 className="text-4xl font-semibold text-center mb-6 text-gray-700">
        NEET UG Counselling Updates
      </h1>

      {/* GRID */}
      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {cards.map((card, index) => (
          <a
            key={index}
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group [perspective:1000px]"
          >
            <div className="relative h-[280px] w-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* FRONT */}
              <div
                className="absolute inset-0 rounded-xl shadow-lg bg-cover bg-center text-white flex items-center justify-center [backface-visibility:hidden]"
                style={{ backgroundImage: `url(${card.image})` }}
              >
                <div className="bg-black/60 w-full h-full rounded-xl flex flex-col items-center justify-center text-center p-4">
                  <p className="text-xl font-semibold">{card.title}</p>
                  <span className="text-sm text-gray-200">{card.subtitle}</span>
                </div>
              </div>

              {/* BACK */}
              <div className="absolute inset-0 rounded-xl shadow-lg bg-gradient-to-br from-gray-300 to-gray-600 text-white flex items-center justify-center p-4 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <p className="text-sm">{card.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SeatCardsUG;
