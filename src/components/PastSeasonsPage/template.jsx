import seasonData from "@/data/serving/seasons.json";
import { formatEventTime, getConcertData, getMusicianNames, getVenueString, getWorkDetails } from "@/utils/getDetails";
import Image from "next/image";
import Markdown from "react-markdown";

const seasonColors = seasonData.find((season) => season.year === "YYYY")?.["season-theme"] || {};

export function SeasonYYYY({ seasonYearData }) {
  return (
    <div
      className={`season-container relative w-full min-h-0 flex-1 flex flex-col items-start rounded-none overflow-y-auto [container-type:size] border`}
      style={{ backgroundColor: seasonColors["background"], borderColor: seasonColors["secondary"] }}
    >
      <div
        className="season-landing w-[100cqw] h-[100cqh] min-h-[max(50svh,600px)] flex flex-col justify-center items-center mx-auto p-[min(10cqw,10cqh)] max-h-[min(90svw,90svh)] border-b"
        style={{ borderColor: seasonColors["secondary"] }}
      >
        <div className="season-logo-container w-full h-full relative">
          <Image src={`/graphics/seasons/image.png`} alt="Image" fill />
        </div>
      </div>

      <div
        className={`seasons-content w-full relative grid pb-[2ch]`}
        style={{ backgroundColor: seasonColors["primary"], color: seasonColors["background"] }}
      >
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
  );
}
