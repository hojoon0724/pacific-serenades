import seasonData from "@/data/serving/seasons.json";
import { formatEventTime, getConcertData, getMusicianNames, getVenueString, getWorkDetails } from "@/utils/getDetails";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";

const audienceReviews = [
  {
    text: "### THOSE EYES, THOSE EYES\nI love watching the musicians play. You can see how much they feel the music by the way they move. Look at those faces! It's almost telepathicas if they are talking to each other without words. What a joy to hear-and see-such gifted musicians!",
    author: "Our Audience",
  },
  {
    text: "What a memorable evening! Not only is the music beautiful, but all of the people involved made steel so welcome.",
    author: "Our Audience",
  },
];

const pressReviews = [
  {
    text: "### CONCERTS IN CONTEXT\nThe programming practices of Pacific Serenades ought to provide a model for any chamber music series. Held in intimate, hospitable surroundings, each concert places a newly commissioned work alongside examples of the standard chamber music repertory. And that's where contemporary chamber music belongs.",
    author: "Los Angeles Times",
  },
  {
    text: "[The new piece] fit right in with the works flanking it, yet proved a highly original, distinctive statement.",
    author: "Los Angeles Times",
  },
];

const seasonColors = seasonData.find((season) => season.year === "1994")?.["season-theme"] || {};

export function Season1994({ seasonYearData }) {
  const seasonCol2Ref = useRef(null);
  const photoTrackRef = useRef(null);

  const updatePhotoTravel = () => {
    const viewport = seasonCol2Ref.current;
    const track = photoTrackRef.current;
    if (!viewport || !track) return;
    const travel = Math.max(track.scrollHeight - viewport.clientHeight, 0);
    viewport.style.setProperty("--photo-travel", `${travel}px`);
  };

  const handleSeasonCol2Scroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const maxScroll = Math.max(scrollHeight - clientHeight, 1);
    const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
    seasonCol2Ref.current?.style.setProperty("--parallax-progress", `${progress}`);
  };

  useEffect(() => {
    updatePhotoTravel();
    window.addEventListener("resize", updatePhotoTravel);
    return () => window.removeEventListener("resize", updatePhotoTravel);
  }, []);

  return (
    <>
      <style>
        {`
        h2 {
          display: inline-block;
          color: ${seasonColors["primary"]};
        }
        h3 {
          display: inline-block;
          color: ${seasonColors["secondary"]};
          background-color: black;
        }
        `}
      </style>
      <div
        className={`season-container relative h-full w-full min-h-0 flex-1 flex flex-row items-start rounded-none overflow-y-auto [container-type:size] border`}
        style={{ backgroundColor: seasonColors["background"], borderColor: seasonColors["primary"] }}
      >
        <div
          className="season-cover aspect-[1/2] h-[100cqh] grid grid-cols-2 relative border-r"
          style={{ borderColor: seasonColors["primary"] }}
        >
          <div className="season-logo-container w-full h-full relative col-start-1 row-start-1">
            <Image src={`/graphics/seasons/1994/1994-cover-image.svg`} alt="Image" fill className="object-cover" />
          </div>
          <div className="season-title pt-[30cqh] h-full border-black flex justify-center items-center col-start-2 row-start-1 z-20 text-3xl">
            1994 Season
          </div>
          <div className="season-logo-container w-full h-full relative col-start-1 row-start-1 absolute col-span-2 ">
            <Image src={`/graphics/seasons/1994/1994-wordmark.svg`} alt="Image" fill className="object-contain px-8" />
          </div>
        </div>

        <div
          className={`seasons-content-col-1 h-[100cqh] min-w-[clamp(min(100cqw,72ch),100%,72ch)] w-[clamp(min(100cqw,72ch),100%,72ch)] border-r relative`}
          style={{ borderColor: seasonColors["primary"] }}
        >
          <div className="sticky top-0 z-10 pointer-events-none h-full w-full">
            <div className="relative h-full w-full z-1 overflow-clip">
              <Image
                src={`/graphics/seasons/1994/1994-arrow-full-secondary.svg`}
                alt="Image"
                fill
                className="object-contain rotate-[30deg]"
              />
            </div>
          </div>
          <div className="absolute inset-0 z-10 overflow-y-scroll overflow-x-clip grid content-start">
            <div className="content-top flex flex-col p-4 w-[clamp(min(100cqw,72ch),100%,72ch)]">
              <div className="season-message">
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
            <div className="photo-center min-w-[300px] aspect-[2/1] relative -my-8">
              <Image src={`/graphics/seasons/1994/1994-photo-1.png`} alt="Image" fill className="object-contain px-8" />
            </div>
            <div className="content-bottom flex flex-col p-4 w-[clamp(min(100cqw,72ch),100%,72ch)] ">
              {audienceReviews.map((review, index) => (
                <div key={index} className="audience-review max-w-prose text-left">
                  <Markdown>{review.text}</Markdown>
                  {review.author && <div className="author text-right">–{review.author}</div>}
                </div>
              ))}
              {pressReviews.map((review, index) => (
                <div key={index} className="press-review max-w-prose text-left">
                  <Markdown>{review.text}</Markdown>
                  {review.author && <div className="author text-right">–{review.author}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`seasons-content-col-2 h-[100cqh] min-w-[clamp(min(100cqw,100%),100%,100%)] w-[clamp(min(100cqw,100%),100%,100%)] border-r relative overflow-hidden`}
          style={{ backgroundColor: seasonColors["background"], "--parallax-progress": "0", "--photo-travel": "0px" }}
          ref={seasonCol2Ref}
        >
          <div className="sticky top-0 z-0 pointer-events-none h-full w-full">
            <div className="relative h-full w-full z-0 overflow-clip opacity-50">
              <Image
                src={`/graphics/seasons/1994/1994-graphic-2.svg`}
                alt="Image"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="season-photos-container absolute inset-0 h-[100cqh] w-full pointer-events-none z-1 overflow-hidden">
            <div
              ref={photoTrackRef}
              className="photo-track absolute inset-x-0 top-0 flex flex-col gap-8 md:gap-12 lg:gap-16"
              style={{ transform: "translateY(calc(var(--parallax-progress) * var(--photo-travel) * -1))" }}
            >
              <div className="image-brahms relative self-start ml-1 md:ml-2 w-40 h-36 md:w-64 md:h-44 lg:w-80 lg:h-48 opacity-90">
                <Image src="/graphics/seasons/1994/1994-brahms.png" alt="brahms" fill className="object-contain" />
              </div>
              <div className="image-bach relative self-end mr-1 md:mr-2 w-40 h-36 md:w-64 md:h-44 lg:w-80 lg:h-48 opacity-90">
                <Image src="/graphics/seasons/1994/1994-bach.png" alt="bach" fill className="object-contain" />
              </div>
              <div className="image-carlson relative self-start ml-2 md:ml-4 w-40 h-36 md:w-56 md:h-44 lg:w-80 lg:h-56 opacity-90">
                <Image src="/graphics/seasons/1994/1994-carlson.png" alt="carlson" fill className="object-contain" />
              </div>
              <div className="image-french relative self-end mr-2 md:mr-4 w-40 h-36 md:w-56 md:h-44 lg:w-80 lg:h-56 opacity-90">
                <Image src="/graphics/seasons/1994/1994-french.png" alt="french" fill className="object-contain" />
              </div>
              <div className="image-pierce relative self-start ml-2 md:ml-3 w-40 h-36 md:w-56 md:h-44 lg:w-80 lg:h-56 opacity-90">
                <Image src="/graphics/seasons/1994/1994-pierce.png" alt="pierce" fill className="object-contain" />
              </div>
              <div className="image-lipkis relative self-end mr-2 md:mr-3 w-40 h-36 md:w-56 md:h-44 lg:w-80 lg:h-56 opacity-90">
                <Image src="/graphics/seasons/1994/1994-lipkis.png" alt="lipkis" fill className="object-contain" />
              </div>
            </div>
          </div>
          <div
            className="season-concerts-container absolute inset-0 z-10 py-16 lg:py-24 w-full overflow-y-auto flex flex-col gap-36 md:gap-24 lg:gap-12"
            style={{ borderColor: seasonColors["primary"] }}
            onScroll={handleSeasonCol2Scroll}
          >
            {seasonYearData?.concertIds?.map((concertId, index) => {
              const concertData = getConcertData(concertId);
              const venueAndDate = concertData?.dates && concertData.dates.length > 0 ? concertData.dates : null;
              return (
                <div key={concertId} className="concert-tile grid relative w-full">
                  <div className="concert-content col-start-1 row-start-1 p-4 md:p-8 w-full ">
                    <div className="concert-title-container flex flex-col items-center w-full gap-2">
                      <div
                        className={`concert-number-container aspect-square w-[3rem] rounded-full flex justify-center items-center text-2xl p-1 bg-gray-950 italic`}
                        style={{ color: seasonColors["secondary"] }}
                      >
                        {index + 1}
                      </div>
                      <span className="concert-title text-2xl font-serif">{concertData.concertTitle}</span>
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
    </>
  );
}
