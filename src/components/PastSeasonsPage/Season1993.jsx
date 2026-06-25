import seasonData from "@/data/serving/seasons.json";
import { formatEventTime, getConcertData, getMusicianNames, getVenueString, getWorkDetails } from "@/utils/getDetails";
import { Abril_Fatface, Cormorant_Garamond } from "next/font/google";
import Image from "next/image";

const abrilFatface = Abril_Fatface({ subsets: ["latin"], weight: ["400"] });
const cormorantGaramond = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"] });
const seasonColors = seasonData.find((season) => season.year === "1993")?.["season-theme"] || {};

const concertReviews = [
  {
    text: "It was my first time to attend but it certainly won't be the last!",
    author: "a listener",
  },
  {
    text: "The programming practices of Pacific Serenades ought to provide a model for any chamber music series.",
    author: "Los Angeles Times",
  },
  {
    text: "The various players brought elegance and poetry [to the music]",
    author: "Los Angeles Times",
  },
  {
    text: "What a memorable evening!",
    author: "a listener",
  },
  {
    text: "It is a privilege to hear such talented musicians perform for a small audience in a relaxed and intimate setting.",
    author: "a listener",
  },
];
const musicReviews = [
  {
    text: "The first few moments... were so startlingly beautiful-and unexpected—what one's soul wants to experience.",
    author: "a listener",
  },
  {
    text: "pleasantly unpredictable as well as inventive and fresh",
    author: "Los Angeles Times",
  },
  {
    text: "a most attractive and engaging work",
    author: "Los Angeles Times",
  },
  {
    text: "I am indescribably impressed.",
    author: "a listener",
  },
  {
    text: "Thank you again for having enriched the music literature with your wonderful gem of a quartet. It moves me every time I perform it or work on it",
    author: "a listener",
  },
];

export function Season1993({ seasonYearData }) {
  return (
    <div
      className={`season-container relative w-full min-h-0 flex-1 flex flex-col items-start rounded-none overflow-y-auto [container-type:size] ${cormorantGaramond.className} border`}
      style={{ backgroundColor: seasonColors["background"], borderColor: seasonColors["secondary"] }}
    >
      <div
        className="season-landing w-[100cqw] h-[100cqh] min-h-[max(50svh,600px)] flex flex-col justify-center items-center mx-auto p-[min(10cqw,10cqh)] max-h-[min(90svw,90svh)] border-b"
        style={{ borderColor: seasonColors["secondary"] }}
      >
        <div className="season-logo-container w-full h-full relative">
          <Image src={`/graphics/seasons/1993/1993-season-logo.svg`} alt="Season 1993 Logo" fill />
        </div>
      </div>

      <div
        className={`seasons-content w-full relative grid pb-[2ch]`}
        style={{ backgroundColor: seasonColors["primary"], color: seasonColors["background"] }}
      >
        <div className="content-across-down-heading sticky top-0 col-start-1 row-start-1 w-full h-full max-h-[90cqh] z-10 pointer-events-none">
          <div
            className={`${abrilFatface.className} text-sm md:text-lg flex flex-col justify-between items-center absolute top-0 left-0 w-[3ch] pt-[1ch] h-full max-h-[90cqh]`}
          >
            {(() => {
              const text = "COMMENTS";
              return text.split("").map((char, index) => (
                <span className="w-[1ch]" key={index}>
                  {char}
                </span>
              ));
            })()}
          </div>
          <div
            className={`${abrilFatface.className} text-sm md:text-lg flex flex-row justify-between items-center absolute w-full top-0 left-0 px-[1ch] pt-[1ch]`}
          >
            {(() => {
              const text = "CHAMBER MUSIC AS LIVING ART";
              return text.split("").map((char, index) => (
                <span className="w-[1ch]" key={index}>
                  {char}
                </span>
              ));
            })()}
          </div>
        </div>

        <div
          className="reviews-all-container col-start-1 row-start-1 pt-[6ch] pl-[6ch] flex flex-col md:flex-row w-full z-1"
          style={{ backgroundColor: seasonColors["primary"], color: seasonColors["background"] }}
        >
          <div className="reviews-container flex flex-col w-full justify-start">
            <h4>
              <b>Comments about Pacific Serenades:</b>
            </h4>
            {concertReviews.map((review, index) => (
              <div key={index} className="review max-w-prose px-8">
                <p className="text-left">{review.text}</p>
                <p className="text-right text-nowrap italic font-bold text-sm leading-none -mt-2 mb-2">
                  –{review.author}
                </p>
              </div>
            ))}
          </div>
          <div className="reviews-container flex flex-col w-full justify-start">
            <h4>
              <b>and about our new music...</b>
            </h4>
            {musicReviews.map((review, index) => (
              <div key={index} className="review max-w-prose px-8">
                <p className="text-left">{review.text}</p>
                <p className="text-right text-nowrap italic font-bold text-sm leading-none -mt-2 mb-2">
                  –{review.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="season-content relative w-full z-10 flex flex-col items-center">
        <div className="min-w-24 w-[10%] aspect-[5/1] relative">
          <Image src={`/graphics/seasons/1993/1993-half.svg`} alt={`Season ${seasonYearData?.year}`} fill />
        </div>
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
                      className={`concert-number-container aspect-square w-[3rem] rounded-full flex justify-center items-center text-2xl p-1 ${abrilFatface.className}`}
                      style={{ backgroundColor: seasonColors["primary"], color: seasonColors["background"] }}
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
        <div className="min-w-24 w-[10%] aspect-[5/1] relative rotate-180">
          <Image src={`/graphics/seasons/1993/1993-half.svg`} alt={`Season ${seasonYearData?.year}`} fill />
        </div>
      </div>
    </div>
  );
}
