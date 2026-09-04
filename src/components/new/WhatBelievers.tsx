"use client";

import { useEffect, useState } from "react";
import "./WhatBelievers.css";

type BelieverItem = {
  number: string;
  label: string;
  title: string;
  description: string;
};

const believerItems: BelieverItem[] = [
  {
    number: "01",
    label: "UNDERSTAND",
    title: "Your Rank & Realistic Options",
    description:
      "Previous-year closing ranks, cut-offs and realistic possibilities.",
  },
  {
    number: "02",
    label: "EVALUATE",
    title: "Colleges & Branches",
    description:
      "Compare what each option actually means for your career.",
  },
  {
    number: "03",
    label: "PLAN",
    title: "Your Counselling Strategy",
    description:
      "AIQ, State counselling, quotas, upgrades and preference planning.",
  },
  {
    number: "04",
    label: "DECIDE",
    title: "With Confidence",
    description:
      "Move forward with clarity — not confusion or guesswork.",
  },
];

export default function WhatBelievers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const activeItem = believerItems[activeIndex];

  const goToSlide = (index: number) => {
    if (index === activeIndex) return;

    setDirection(index > activeIndex ? "next" : "prev");
    setActiveIndex(index);
  };

  const goNext = () => {
    setDirection("next");

    setActiveIndex((current) =>
      current === believerItems.length - 1 ? 0 : current + 1
    );
  };

  const goPrev = () => {
    setDirection("prev");

    setActiveIndex((current) =>
      current === 0 ? believerItems.length - 1 : current - 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goNext();
      }

      if (event.key === "ArrowLeft") {
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section className="what-believers" id="what-believers">
      <div className="what-believers__container">

        {/* HEADER */}
        <div className="what-believers__header">

          <div className="what-believers__eyebrow">
            WHAT BELIEVERS HELPS YOU DO
          </div>

          <h2 className="what-believers__heading">
            <span>From</span>
            <strong>Rank to the Right Decision.</strong>
          </h2>

        </div>

        {/* TABS */}
        <div
          className="what-believers__tabs"
          role="tablist"
          aria-label="What Believers Helps You Do"
        >
          {believerItems.map((item, index) => (
            <button
              key={item.number}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              className={`what-believers__tab ${
                activeIndex === index
                  ? "what-believers__tab--active"
                  : ""
              }`}
              onClick={() => goToSlide(index)}
            >
              <span>{item.number}</span>
             
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* SLIDER AREA */}
        <div className="what-believers__slider">

          {/* PREVIOUS */}
          <button
            type="button"
            className="what-believers__arrow what-believers__arrow--prev"
            onClick={goPrev}
            aria-label="Previous"
          >
            <svg
              viewBox="0 0 70 50"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M3 25H65" />
              <path d="M20 8L3 25L20 42" />
            </svg>
          </button>

          {/* SLIDE */}
          <div className="what-believers__slide">

            {/* LEFT VISUAL */}
            <div
              key={`visual-${activeIndex}`}
              className={`what-believers__visual what-believers__visual--${direction}`}
            >
              <div className="what-believers__visual-bg" />

              <div className="what-believers__visual-orbit">
                <span />
                <span />
                <span />
              </div>

              <div className="what-believers__visual-content">
                <div className="what-believers__visual-number">
                  {activeItem.number}
                </div>

                <div className="what-believers__visual-label">
                  {activeItem.label}
                </div>

                <div className="what-believers__visual-line" />

                <p>
                  {activeItem.title}
                </p>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div
              key={`content-${activeIndex}`}
              className={`what-believers__content what-believers__content--${direction}`}
            >
              <div className="what-believers__content-inner">

                <div className="what-believers__content-number">
                  {activeItem.number} 
                </div>

                <div className="what-believers__content-label">
                  {activeItem.label}
                </div>

                <h3>
                  {activeItem.title}
                </h3>

                <p>
                  {activeItem.description}
                </p>

              </div>
            </div>

          </div>

          {/* NEXT */}
          <button
            type="button"
            className="what-believers__arrow what-believers__arrow--next"
            onClick={goNext}
            aria-label="Next"
          >
            <svg
              viewBox="0 0 70 50"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M5 25H67" />
              <path d="M50 8L67 25L50 42" />
            </svg>
          </button>

        </div>

      </div>
    </section>
  );
}