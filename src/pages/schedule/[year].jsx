import { ChevronDown } from "@/components/Icons";
import SeasonIndex from "@/components/SeasonIndex";
import seasonData from "@/data/serving/seasons.json";
import { useEffect, useRef, useState } from "react";

export function getStaticPaths() {
  const paths = seasonData.map((season) => ({
    params: { year: season.year },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
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

  return { props: { currentSeasonConcertsDetails, year: params.year } };
}

export default function ScheduleYear({ year }) {
  const seasonIndexRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState(year);

  useEffect(() => {
    setSelectedYear(year);
  }, [year]);

  return (
    <div className="top-container flex flex-col items-center justify-center">
      <div id="past-seasons" className="w-full relative flex flex-col items-center justify-center">
        <div className="past-seasons">
          <div className="relative inline-block">
            <h1 className="pointer-events-none inline-flex items-center gap-2">
              {selectedYear} Season
              <ChevronDown className="pointer-events-none" fill="#000" size={16} />
            </h1>
            <select
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              aria-label="Select season"
              onChange={(e) => {
                const selectedYear = e.target.value;
                setSelectedYear(selectedYear);
                seasonIndexRef.current?.transitionToSeason(selectedYear);
              }}
              value={selectedYear}
            >
              {seasonData.map((season, index) => (
                <option key={index} value={season.year}>
                  {season.year} Season
                </option>
              ))}
            </select>
          </div>
        </div>
        <SeasonIndex
          ref={seasonIndexRef}
          initialYear={year}
          onSeasonChange={(season) => setSelectedYear(season.year)}
        />
      </div>
    </div>
  );
}
