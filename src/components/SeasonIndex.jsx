import ConcertTile from "@/components/ConcertTile";
import seasonData from "@/data/serving/seasons.json";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

export default function SeasonIndex({ bgColor, initialYear }) {
  const router = useRouter();
  const findSeason = (year) => seasonData.find((s) => s.year === year) ?? seasonData[0];
  const [selectedSeason, setSelectedSeason] = useState(() => findSeason(initialYear));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (initialYear) setSelectedSeason(findSeason(initialYear));
  }, [initialYear]);

  const handleSeasonChange = (season) => {
    if (season === selectedSeason) return;
    setVisible(false);
    setTimeout(() => {
      setSelectedSeason(season);
      setVisible(true);
    }, 200);
    router.push(`/schedule/${season.year}`, undefined, { shallow: true });
  };

  return (
    <section className={`season-show-top-container w-screen`}>
      <div className="season-list-menu sticky top-[clamp(100px,20svw,200px)] z-40 bg-inherit mx-auto w-screen overflow-auto flex flex-col items-center justify-center">
        <div className="flex gap-2 overflow-x-auto py-2 px-2 w-fit mx-auto">
          {seasonData.map((season, index) => (
            <div
              key={index}
              className={`season-list-item shrink-0 px-4 py-2 text-sm font-bold rounded-lg transition-all ${season === selectedSeason ? "selected bg-teal-600 border-b-2 border-teal-800" : "bg-blue-600 border-blue-800 opacity-40"}`}
              onClick={() => handleSeasonChange(season)}
            >
              {season.year}
            </div>
          ))}
        </div>
      </div>
      <div className="season-details mt-8 text-center bg-white h-[69svh] m-2 rounded-lg flex flex-col overflow-x-clip overflow-y-scroll relative">
        <div
          className={`content-container absolute inset-0 z-10 flex flex-col p-4 transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <h1 className="text-4xl font-bold w-full text-left">{selectedSeason.year}</h1>

          {selectedSeason.seasonIntroMd && (
            <div className="intro-text-container max-w-prose text-left">
              <Markdown>{selectedSeason.seasonIntroMd.text}</Markdown>
              {selectedSeason.seasonIntroMd.author && (
                <div className="author text-right">–{selectedSeason.seasonIntroMd.author}</div>
              )}
            </div>
          )}
          <div className="concerts-container">
            {selectedSeason.concertIds?.map((concertId) => (
              <ConcertTile key={concertId} concertId={concertId} />
            ))}
          </div>
        </div>
        <div className="bg-image-container absolute inset-0">
          {/* <Image src="/backgrounds/home-bg.jpg" alt="alt" fill /> */}
        </div>
      </div>
    </section>
  );
}
