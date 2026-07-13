import seasonData from "@/data/serving/seasons.json";
import { formatEventTime, getConcertData, getMusicianNames, getVenueString, getWorkDetails } from "@/utils/getDetails";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { capitalizeTitle } from "@/utils/titleCapitalization";

const seasonColors = seasonData.find((season) => season.year === "1996")?.["season-theme"] || {};

const composersNamesBgTexture = [
  "robert aldridge",
  "martin amlin",
  "john maxwell anderson",
  "bach",
  "elaine barkin",
  "bartók",
  "Beethoven",
  "Berg",
  "Bernstein",
  "zelman bokser",
  "roger bourland",
  "brahms",
  "bruch",
  "mark carlson",
  "paul chihara",
  "chopin",
  "david conte",
  "debussy",
  "dohnanyi",
  "dvorák",
  "fauré",
  "franck",
  "tania gabrielle french",
  "frescobaldi",
  "handel",
  "haydn",
  "dindemith",
  "ives",
  "michael kibbe",
  "krebs",
  "ian krouse",
  "robert kyr",
  "larry lipkis",
  "luebeck",
  "martin",
  "martinu",
  "mendelssohn",
  "mozart",
  "alexandra pierce",
  "poulenc",
  "ravel",
  "paul reale",
  "rimsky-korsakov",
  "schubert",
  "schumann",
  "smetana",
  "russell steinberg",
  "john steinmetz",
  "strauss",
  "vivaldi",
  "von weber",
];

export function Season1996({ seasonYearData }) {
  const [showSeparators, setShowSeparators] = useState([]);
  const textureRef = useRef(null);
  const composerRefs = useRef([]);

  useEffect(() => {
    const updateSeparators = () => {
      const refs = composerRefs.current.filter(Boolean);
      if (!refs.length) {
        setShowSeparators([]);
        return;
      }

      const tops = refs.map((el) => Math.round(el.offsetTop));
      const nextVisibility = refs.map((_, index) => index < refs.length - 1 && tops[index] === tops[index + 1]);

      setShowSeparators((prev) => {
        if (prev.length === nextVisibility.length && prev.every((value, index) => value === nextVisibility[index])) {
          return prev;
        }
        return nextVisibility;
      });
    };

    updateSeparators();
    const frameId = requestAnimationFrame(updateSeparators);
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateSeparators) : null;

    if (observer && textureRef.current) {
      observer.observe(textureRef.current);
      composerRefs.current.forEach((el) => el && observer.observe(el));
    }

    window.addEventListener("resize", updateSeparators);

    return () => {
      cancelAnimationFrame(frameId);
      observer?.disconnect();
      window.removeEventListener("resize", updateSeparators);
    };
  }, []);

  return (
    <div
      className={`season-container relative w-full min-h-0 flex-1 flex flex-col items-start rounded-none overflow-y-auto [container-type:size] border`}
      style={{ backgroundColor: seasonColors["background"], borderColor: seasonColors["secondary"] }}
    >
      <div
        className="season-landing relative w-[100cqw] flex flex-col justify-center items-center mx-auto"
        style={{ borderColor: seasonColors["secondary"] }}
      >
        <div className="season-logo-container absolute inset-x-0 top-0 w-full aspect-square max-h-full overflow-hidden opacity-30">
          <Image
            src={`/graphics/seasons/1996/1996-x-2.svg`}
            className="object-contain object-top p-16"
            alt="Image"
            fill
            sizes="100vw"
          />
        </div>
        <div className="relative w-full h-full flex flex-col justify-center items-center">
          <div className="season-title text-4xl my-4">Celebrating 10 years</div>
          <div
            ref={textureRef}
            className="season-background-texture flex flex-wrap justify-center items-center opacity-30 md:p-6 md:text-xl"
          >
            {composersNamesBgTexture.map((name, index) => (
              <div
                key={name}
                ref={(el) => {
                  composerRefs.current[index] = el;
                }}
                className="composer-token inline-flex items-center whitespace-nowrap"
              >
                <div className="composer-name">{name}</div>
                {showSeparators[index] && (
                  <span className="separator mx-2" aria-hidden="true">
                    •
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="season-message flex flex-col justify-center items-center mx-auto p-2 md:p-4">
          {seasonYearData?.seasonIntroMd && (
            <div className="intro-text-container max-w-prose text-left">
              <Markdown>{seasonYearData.seasonIntroMd.text}</Markdown>
              {seasonYearData.seasonIntroMd.author && (
                <div className="author text-right">–{seasonYearData.seasonIntroMd.author}</div>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        className={`seasons-content w-full relative grid pb-[2ch]`}
        style={{ backgroundColor: seasonColors["primary"], color: seasonColors["background"] }}
      >
        <div
          className="season-concerts-container relative w-full grid grid-cols-1 md:grid-cols-2 "
          style={{ borderColor: seasonColors["primary"] }}
        >
          {seasonYearData?.concertIds?.map((concertId, index) => {
            const concertData = getConcertData(concertId);
            const venueAndDate = concertData?.dates && concertData.dates.length > 0 ? concertData.dates : null;
            return (
              <div key={concertId} className="concert-tile grid relative w-full">
                <div className="concert-content col-start-1 row-start-1 p-4 md:p-8 w-full ">
                  <div className="concert-title-container flex flex-col items-center w-full gap-2">
                    <div
                      className={`concert-number-container aspect-square w-[3rem] rounded-full flex justify-center items-center text-2xl p-1`}
                      style={{ backgroundColor: seasonColors["primary"], color: seasonColors["background"] }}
                    >
                      {index + 1}
                    </div>
                    <span className="concert-title text-2xl font-serif">{capitalizeTitle(concertData.concertTitle)}</span>
                  </div>
                  <div className="venue-date-time-container mt-4 flex flex-col">
                    {venueAndDate &&
                      venueAndDate.map((event, index) => (
                        <div key={index} className="venue-date-time text-center">
                          <div className="venue mr-[1ch]">
                            <span className="whitespace-nowrap ">
                              <span>{new Date(event.date).toLocaleDateString("en-US", { weekday: "long" })}, </span>
                              <span>
                                {new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                                ,{" "}
                              </span>
                              <span>{formatEventTime(event.time, "hour-only")} </span>
                            </span>
                            <span>({getVenueString(event.venueId)})</span>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="program-musicians-container w-full flex flex-col md:flex-row gap-8 mt-4 w-full">
                    {concertData?.program && (
                      <div className="program-container flex flex-col h-full items-start justify-start w-full">
                        <div className="program-list w-full text-center">
                          {concertData.program.map((workId) => {
                            const workDetails = getWorkDetails(workId);
                            return (
                              <div key={workId} className="work-details">
                                <span className="composer text-nowrap">{workDetails.composerName}: </span>
                                <span className="work-name">{workDetails.workName}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="musicians-container mt-4 w-full">
                    {concertData?.musicians && (
                      <div className="musicians-container font-serif flex flex-wrap h-full justify-center gap-x-[1ch]">
                        {concertData.musicians.map((musicianId, index) => {
                          const musicianName = getMusicianNames({ musicians: [musicianId] })[0] || musicianId;
                          return (
                            <div
                              key={index}
                              className="musician-name font-bold text-sm whitespace-nowrap"
                              style={{ color: seasonColors.tertiary }}
                            >
                              {musicianName}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
