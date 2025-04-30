import CurrentSeason from "@/components/CurrentSeasonBlock";
import { useEffect, useState } from "react";
import PastSeasons from "../../components/PastSeasons";

export default function Schedule() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToPastSeasons = () => {
    const pastSeasonsElement = document.getElementById("past-seasons");
    if (pastSeasonsElement) {
      // Get the y-coordinate of the element
      const yCoordinate = pastSeasonsElement.getBoundingClientRect().top + window.pageYOffset;
      // Add offset for the navigation bar (doubled to 200px)
      const navbarOffset = 200;
      // Scroll to the element with offset
      window.scrollTo({
        top: yCoordinate - navbarOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="top-container flex flex-col items-center justify-center">
      <CurrentSeason />
      <div id="past-seasons" className="pt-4">
        <PastSeasons bgColor={"bg-blue-100"} />
      </div>

      {showButton && (
        <button
          onClick={scrollToPastSeasons}
          className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all z-50"
          aria-label="Scroll to Past Seasons"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}
