// import React, { useEffect, useState } from "react";

// const categories = [
//   { text: "NEET PG", comingSoon: false },
//   { text: "NEET UG", comingSoon: true },
//   { text: "NEET SS", comingSoon: true },
//   { text: "INICET", comingSoon: true },
// ];

// const TypingCategories: React.FC = () => {
//   const [index, setIndex] = useState(0);
//   const [displayedText, setDisplayedText] = useState("");
//   const [isDeleting, setIsDeleting] = useState(false);

//   const typingSpeed = 100; // typing speed (ms per character)
//   const deletingSpeed = 50; // deleting speed
//   const pauseTime = 1500; // pause before delete

//   useEffect(() => {
//     const current = categories[index];
//     let timer: ReturnType<typeof setTimeout>;

//     if (!isDeleting && displayedText.length < current.text.length) {
//       // typing
//       timer = setTimeout(() => {
//         setDisplayedText(current.text.slice(0, displayedText.length + 1));
//       }, typingSpeed);
//     } else if (isDeleting && displayedText.length > 0) {
//       // deleting
//       timer = setTimeout(() => {
//         setDisplayedText(current.text.slice(0, displayedText.length - 1));
//       }, deletingSpeed);
//     } else if (!isDeleting && displayedText.length === current.text.length) {
//       // wait before deleting
//       timer = setTimeout(() => setIsDeleting(true), pauseTime);
//     } else if (isDeleting && displayedText.length === 0) {
//       // move to next
//       setIsDeleting(false);
//       setIndex((prev) => (prev + 1) % categories.length);
//     }

//     return () => clearTimeout(timer);
//   }, [displayedText, isDeleting, index]);

//   return (
//     <div className="text-center mt-4">
//       <h2 className="text-2xl md:text-6xl font-bold">
//         <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
//           {displayedText}
//         </span>
//         <span className="text-black animate-pulse">|</span>
//       </h2>

//       {/* Show "COMING SOON" if needed */}
//       {categories[index].comingSoon && (
//         <p className="mt-2 text-gray-600 font-medium animate-fadeIn text-sm">
//           COMING SOON
//         </p>
//       )}
//     </div>
//   );
// };

// export default TypingCategories;
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
  const [comingSoonText, setComingSoonText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComingSoonDeleting, setIsComingSoonDeleting] = useState(false);

  const typingSpeed = 100; // typing speed (ms per character)
  const deletingSpeed = 50; // deleting speed
  const pauseTime = 1500; // pause before delete
  const comingSoonDelay = 300; // delay before typing "COMING SOON"

  useEffect(() => {
    const current = categories[index];
    const comingSoonFullText = "COMING SOON";
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText.length < current.text.length) {
      // typing main text
      timer = setTimeout(() => {
        setDisplayedText(current.text.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayedText.length === current.text.length && current.comingSoon) {
      // start typing "COMING SOON" after delay
      if (comingSoonText.length < comingSoonFullText.length) {
        timer = setTimeout(() => {
          setComingSoonText(comingSoonFullText.slice(0, comingSoonText.length + 1));
        }, comingSoonText.length === 0 ? comingSoonDelay : typingSpeed);
      } else {
        // pause before deleting
        timer = setTimeout(() => {
          setIsComingSoonDeleting(true);
          setIsDeleting(true);
        }, pauseTime);
      }
    } else if (!isDeleting && displayedText.length === current.text.length && !current.comingSoon) {
      // no coming soon, just wait before deleting
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && (comingSoonText.length > 0 || isComingSoonDeleting)) {
      // deleting "COMING SOON" first
      timer = setTimeout(() => {
        setComingSoonText(comingSoonFullText.slice(0, comingSoonText.length - 1));
        if (comingSoonText.length === 1) {
          setIsComingSoonDeleting(false);
        }
      }, deletingSpeed);
    } else if (isDeleting && displayedText.length > 0) {
      // deleting main text
      timer = setTimeout(() => {
        setDisplayedText(current.text.slice(0, displayedText.length - 1));
      }, deletingSpeed);
    } else if (isDeleting && displayedText.length === 0) {
      // move to next
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % categories.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, comingSoonText, isDeleting, isComingSoonDeleting, index]);

  return (
    <div className="text-center mt-4">
      <h2 className="text-2xl md:text-6xl font-bold">
        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          {displayedText}
        </span>
        <span className="text-black animate-pulse">|</span>
      </h2>

      {/* Show "COMING SOON" with typing animation */}
      {categories[index].comingSoon && comingSoonText && (
        <p className="mt-2 font-medium text-xs md:text-sm">
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            {comingSoonText}
          </span>
          {comingSoonText.length > 0 && (
            <span className="text-black animate-pulse">|</span>
          )}
        </p>
      )}
    </div>
  );
};

export default TypingCategories;