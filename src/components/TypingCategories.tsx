import React, { useEffect, useState } from "react";

const categories = [
  { text: "NEET PG", comingSoon: false },
  { text: "NEET UG", comingSoon: true },
  { text: "NEET SS", comingSoon: true },
  { text: "INICET", comingSoon: true },
];

const TypingCategories: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 100; // typing speed (ms per character)
  const deletingSpeed = 50; // deleting speed
  const pauseTime = 1500; // pause before delete

  useEffect(() => {
    const current = categories[index];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText.length < current.text.length) {
      // typing
      timer = setTimeout(() => {
        setDisplayedText(current.text.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (isDeleting && displayedText.length > 0) {
      // deleting
      timer = setTimeout(() => {
        setDisplayedText(current.text.slice(0, displayedText.length - 1));
      }, deletingSpeed);
    } else if (!isDeleting && displayedText.length === current.text.length) {
      // wait before deleting
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayedText.length === 0) {
      // move to next
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % categories.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, index]);

  return (
    <div className="text-center mt-4">
      <h2 className="text-2xl md:text-6xl font-bold">
        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          {displayedText}
        </span>
        <span className="text-black animate-pulse">|</span>
      </h2>

      {/* Show "COMING SOON" if needed */}
      {categories[index].comingSoon && (
        <p className="mt-2 text-gray-600 font-medium animate-fadeIn text-sm">
          COMING SOON
        </p>
      )}
    </div>
  );
};

export default TypingCategories;
