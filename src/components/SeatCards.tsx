import React from "react";
import { FileText, ExternalLink } from "lucide-react";

const SeatCards: React.FC = () => {
  const seatMatrices = [
    {
      title: "Final All India Quota Seats Matrix",
      subtitle: "PG Counselling 2026",
      href: "https://drive.google.com/file/d/1fNQirqUzhQTex9GzyiglXCJvnzoUjmrP/view",
    },
    {
      title: "Final Deemed Seats Matrix",
      subtitle: "PG Counselling 2026",
      href: "https://drive.google.com/file/d/1WI16ykdpwXt-AtsV-mYUwNNkZ8J-ofzs/view",
    },
    {
      title: "Final Seats Matrix DNB",
      subtitle: "PG Counselling 2026",
      href: "https://drive.google.com/file/d/1Ec0r9kco5j98R4f2yW2Fn3dPGN6r5ZCC/view",
    },
    {
      title: "Final Central Internal Quota Seats Matrix",
      subtitle: "PG Counselling 2026",
      href: "https://drive.google.com/file/d/17OXdKYVJK203GLEfi8kpouMviy-om5i0/view",
    },
  ];

  return (
    <section className="w-[95%] max-w-7xl mx-auto py-6 mb-8 lg:mb-12">
      <div className="text-center mb-8">
        <span className="inline-block text-sm font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 px-4 py-2 rounded-full mb-3">
          PG Counselling 2026
        </span>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
          Seat Matrix
          <span className="text-orange-500"> Documents</span>
        </h2>

        <p className="text-gray-500 mt-3 text-sm sm:text-base">
          Access the latest seat matrix documents for PG counselling.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {seatMatrices.map((seat, index) => (
          <div
            key={seat.href}
            className="group relative flex flex-col bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-orange-300 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                <FileText size={24} />
              </div>

              <span className="text-sm font-semibold text-gray-400">
                0{index + 1}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 leading-snug mb-2 group-hover:text-orange-600 transition-colors duration-300">
              {seat.title}
            </h3>

            <p className="text-sm text-gray-500 mb-6">{seat.subtitle}</p>

            <a
              href={seat.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${seat.title} ${seat.subtitle}`}
              className="mt-auto inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition-all duration-300"
            >
              View Document
              <ExternalLink size={16} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SeatCards;
