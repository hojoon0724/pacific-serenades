import CurrentSeason from "@/components/CurrentSeasonBlock";
import SeasonIndex from "@/components/SeasonIndex";
import { useEffect, useState } from "react";

export async function getStaticProps() {
  const concertsData = (await import("@/data/serving/concertsData.json")).default;
  const seasons = (await import("@/data/serving/seasons.json")).default;
  const worksData = (await import("@/data/serving/worksData.json")).default;

  const currentSeasonKeys = seasons[0].concertIds;
  const currentSeasonConcertsDetails = currentSeasonKeys
    .map((concertKey) => {
      const found = concertsData.find((c) => c.id === concertKey);
      if (!found) return null;
      const concertData = { ...found };
      if (Array.isArray(concertData.program)) {
        concertData.programDetails = concertData.program.map(
          (workId) => worksData[workId] || { workName: workId, instrumentation: "" },
        );
      }
      return concertData;
    })
    .filter(Boolean);

  return { props: { currentSeasonConcertsDetails } };
}

export default function Schedule({ currentSeasonConcertsDetails }) {
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
      <CurrentSeason currentSeason={currentSeasonConcertsDetails} />
      {/* Make PastSeasons hover reveal component and onClick redirects to season's page */}
      
      {/* <div id="past-seasons" className="w-full relative flex flex-col items-center justify-center bg-blue-100 pt-4">
        <h1 className="py-4">Past Seasons</h1>
        <SeasonIndex bgColor={"bg-blue-100"} />
      </div> */}

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
