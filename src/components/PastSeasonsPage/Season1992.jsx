import seasonData from "@/data/serving/seasons.json";
import { formatEventTime, getConcertData, getMusicianNames, getVenueString, getWorkDetails } from "@/utils/getDetails";
import Image from "next/image";
import Markdown from "react-markdown";

const seasonColors = seasonData.find((season) => season.year === "1992")?.["season-theme"] || {};
const concertReviews = [
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
    text: "Certainly no small part of our pleasure was in feeling welcomed by your group.”",
    author: "a listener",
  },
  {
    text: "Our [low-income] seniors are deeply grateful for the added life dimension provided by complimentary tickets to outstanding performances by Pacific Serenades.",
    author: "a seniors organization",
  },
  {
    text: "The more I get around our profession, the more remarkable the whole Pacific Serenades project seems.",
    author: "a composer",
  },
];
const musicReviews = [
  {
    text: "tuneful, beautiful in its controlled sentiment",
    author: "Los Angeles Times",
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
    text: "I loved your new composition-hope it finds its way to CD soon, so I can get a copy.",
    author: "a listener",
  },
  {
    text: "I am indescribably impressed.",
    author: "a listener",
  },
];

export function Season1992({ seasonYearData }) {
  return (
    <div
      className="season-container relative w-full min-h-0 flex-1 flex flex-col items-start rounded-none overflow-y-auto border-2 md:border-4"
      style={{
        backgroundColor: seasonColors["background"],
        borderColor: seasonColors["secondary"],
        outlineColor: seasonColors["primary"],
      }}
    >
      <div className="season-landing w-full border-8" style={{ borderColor: seasonColors["primary"] }}>
        <Image
          src={`/graphics/seasons/1992/1992-bg.svg`}
          alt="Season 1992"
          width={1920}
          height={1080}
          className="w-full h-auto"
        />
      </div>
      <div className="season-content relative w-full z-10">
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
        <div
          className="season-concerts-container relative w-full grid grid-cols-1 md:grid-cols-2 border-8 border-t-0"
          style={{ borderColor: seasonColors["primary"] }}
        >
          {seasonYearData?.concertIds?.map((concertId, index) => {
            const concertData = getConcertData(concertId);
            const venueAndDate = concertData?.dates && concertData.dates.length > 0 ? concertData.dates : null;
            const isBottom = index >= 2;
            const isRight = index % 2 === 1;
            const numberSvg = (
              <div
                className={`concert-number-svg w-20 md:w-24 z-10 sticky ${isBottom ? " bottom-0" : " top-0"} ${isRight ? "self-end" : "self-start"}`}
              >
                <Image
                  src={`/graphics/seasons/1992/1992-concert-${index + 1}.svg`}
                  alt={`Concert ${concertId}`}
                  width={400}
                  height={300}
                />
              </div>
            );
            return (
              <div
                key={concertId}
                className="concert-tile grid relative border-b-8 md:border-b-0 w-full"
                style={{
                  textAlign: index % 2 === 0 ? "left" : "right",
                  borderColor: seasonColors["primary"],
                }}
              >
                <div className="concert-content col-start-1 row-start-1 p-4 md:p-8 w-full ">
                  <div className="concert-title px-12 text-2xl font-serif">{concertData.concertTitle}</div>
                  <div className="venue-date-time-container mt-4">
                    {venueAndDate &&
                      venueAndDate.map((event, index) => (
                        <div key={index} className="venue-date-time">
                          <div className="venue mr-[1ch]">
                            <span className="whitespace-nowrap">
                              <span>{new Date(event.date).toLocaleDateString("en-US", { weekday: "long" })}, </span>
                              <span>
                                {new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                                ,{" "}
                              </span>
                              <span>{formatEventTime(event.time, "hour-only")} </span>
                            </span>
                            <span>({getVenueString(event.venueId)}) </span>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div
                    className="program-musicians-container w-full flex flex-col md:flex-row gap-8 mt-4 items-end"
                    style={{ justifyContent: index % 2 === 0 ? "start" : "end" }}
                  >
                    {concertData?.program && (
                      <div className="program-container flex flex-col h-full items-start justify-start">
                        <table className="text-left text-">
                          <tbody>
                            {concertData.program.map((workId) => {
                              const workDetails = getWorkDetails(workId);
                              return (
                                <tr key={workId} className="work-details" style={{ verticalAlign: "top" }}>
                                  <td
                                    className="composer text-nowrap"
                                    style={{
                                      color: seasonColors.secondary,
                                      textShadow: "0px 0px 2px rgb(0 0 0 / 0.3)",
                                    }}
                                  >
                                    {workDetails.composerName}
                                  </td>
                                  <td
                                    className="work-name"
                                    style={{ color: seasonColors.tertiary, paddingLeft: "1ch" }}
                                  >
                                    {workDetails.workName}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                  <div className="musicians-container mt-4 px-16">
                    {concertData?.musicians && (
                      <div className="musicians-container font-serif flex flex-col h-full justify-end">
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
                <div
                  className={`concert-number-container col-start-1 row-start-1 flex flex-col ${isBottom ? "justify-end" : "justify-start"}`}
                >
                  {numberSvg}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="brochure-content-back-top w-full border-8 text-center font-serif p-4 border-y-0"
        style={{ borderColor: seasonColors["primary"] }}
      >
        <h2 className="" style={{ color: seasonColors["secondary"] }}>
          Hear us at the elegant Biltmore Hotel or in the intimacy of a private home.
        </h2>
      </div>
      <div className="brochure-back-graphic w-full border-8" style={{ borderColor: seasonColors["primary"] }}>
        <Image
          src={`/graphics/seasons/1992/1992-bg-back.svg`}
          alt="Season 1992"
          width={1920}
          height={1080}
          className="w-full h-auto"
        />
      </div>
      <div
        className="brochure-content-back-text w-full border-8 text-center font-serif p-4 border-t-0"
        style={{ borderColor: seasonColors["primary"] }}
      >
        <div className="review-container grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
          <div className="reviews-container flex flex-col">
            <h4 style={{ color: seasonColors["secondary"] }}>
              <b>Comments about Pacific Serenades:</b>
            </h4>
            {concertReviews.map((review, index) => (
              <div key={index} className="review max-w-prose px-8">
                <p className="text-left" style={{ color: seasonColors["secondary"] }}>
                  {review.text}
                </p>
                <p
                  className="text-right text-nowrap italic font-bold text-sm leading-none -mt-2 mb-2"
                  style={{ color: seasonColors["secondary"] }}
                >
                  –{review.author}
                </p>
              </div>
            ))}
          </div>
          <div className="reviews-container flex flex-col">
            <h4 style={{ color: seasonColors["secondary"] }}>
              <b>and about our new music...</b>
            </h4>
            {musicReviews.map((review, index) => (
              <div key={index} className="review max-w-prose px-8">
                <p className="text-left" style={{ color: seasonColors["secondary"] }}>
                  {review.text}
                </p>
                <p
                  className="text-right text-nowrap italic font-bold text-sm leading-none -mt-2 mb-2"
                  style={{ color: seasonColors["secondary"] }}
                >
                  –{review.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
