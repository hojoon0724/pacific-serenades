import ConcertTile from "@/components/ConcertTile";
import seasonData from "@/data/serving/seasons.json";
import { useRouter } from "next/router";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Markdown from "react-markdown";

import {
  Season1982,
  Season1990,
  Season2005,
  Season2006,
  Season2007,
  Season2008,
  Season2009,
  Season2010,
  Season2011,
  Season2012,
  Season2013,
} from "@/components/PastSeasonsPage";

const CUSTOM_SEASON_COMPONENTS = {
  1982: Season1982,
  1990: Season1990,
  2005: Season2005,
  2006: Season2006,
  2007: Season2007,
  2008: Season2008,
  2009: Season2009,
  2010: Season2010,
  2011: Season2011,
  2012: Season2012,
  2013: Season2013,
};

const SeasonIndex = forwardRef(function SeasonIndex({ bgColor, initialYear, onSeasonChange }, ref) {
  const router = useRouter();
  const findSeason = (year) => seasonData.find((s) => s.year === year) ?? seasonData[0];
  const [selectedSeason, setSelectedSeason] = useState(() => findSeason(initialYear));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (initialYear) setSelectedSeason(findSeason(initialYear));
  }, [initialYear]);

  const handleSeasonChange = (season) => {
    if (season === selectedSeason) return;
    onSeasonChange?.(season);
    setVisible(false);
    setTimeout(() => {
      setSelectedSeason(season);
      setVisible(true);
    }, 200);
    router.push(`/schedule/${season.year}`, undefined, { shallow: true });
  };

  useImperativeHandle(ref, () => ({
    transitionToSeason(year) {
      handleSeasonChange(findSeason(year));
    },
  }));

  const CustomSeasonComponent = CUSTOM_SEASON_COMPONENTS[selectedSeason.year];
  if (CustomSeasonComponent) {
    return <CustomSeasonComponent seasonYearData={selectedSeason} />;
  }

  return (
    <section className={`season-show-top-container w-screen h-full flex flex-1 min-h-full`}>
      <div className="season-details text-center bg-white h-full flex flex-col overflow-x-clip relative">
        <div
          className={`content-container inset-0 z-10 flex flex-col p-4 transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
        >
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
        <div className="bg-image-container absolute inset-0"></div>
      </div>
    </section>
  );
});

export default SeasonIndex;
