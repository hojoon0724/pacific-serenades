import seasonData from "@/data/serving/seasons.json";
import { formatEventTime, getConcertData, getMusicianNames, getVenueString, getWorkDetails } from "@/utils/getDetails";
import Image from "next/image";
import Markdown from "react-markdown";

const seasonColors = seasonData.find((season) => season.year === "2005")?.["season-theme"] || {};

function splitTitleAndSource(title = "") {
  const closingQuoteIndex = Math.max(title.lastIndexOf('"'), title.lastIndexOf("”"));

  if (closingQuoteIndex === -1) {
    return { concertTitle: title, quoteSource: "" };
  }

  return {
    concertTitle: title.slice(0, closingQuoteIndex + 1).trim(),
    quoteSource: title.slice(closingQuoteIndex + 1).trim(),
  };
}

export function Season2005({ seasonYearData }) {
  return (
    <div
      className="season-container relative w-full h-full min-h-0 flex-1 flex flex-col items-start overflow-hidden rounded-xl"
      style={{ backgroundColor: seasonColors["background"] }}
    >
      <div className="season-bg-container pointer-events-none absolute inset-0 rounded-xl">
        <div className="element-1 absolute top-0 right-0 w-[35%]">
          <Image
            src="/graphics/seasons/2005/2005-bg-top-right-corner.png"
            alt={`Season ${seasonYearData?.year} Background`}
            width={776}
            height={1222}
            className="block w-full h-auto"
          />
        </div>
      </div>
      <div className="season-content relative z-10 h-full min-h-0 self-stretch overflow-y-auto p-2 md:p-4">
        <div className="season-title-container flex flex-col items-start gap-4 mt-[30%] mb-[30%]">
          <div className="season-year min-w-40 w-auto max-w-[400px] h-16 relative">
            <Image src={`/graphics/seasons/2005/2005-year.svg`} alt={`Season ${seasonYearData?.year} title`} fill />
          </div>
          <div className="season-title max-w-[65%]">
            <Image
              src={`/graphics/seasons/2005/2005-season-title.svg`}
              alt={`Season ${seasonYearData?.year} title`}
              width={400}
              height={100}
            />
          </div>
          <div className="logo-container max-w-[20%]">
            <Image
              src={`/graphics/seasons/2005/2005-logo.svg`}
              alt={`Season ${seasonYearData?.year} logo`}
              width={150}
              height={150}
            />
          </div>
        </div>
        <div className="season-message z-10 relative h-fit px-2 py-1 md:p-4 md:py-2 flex items-center justify-center bg-gray-200/30 rounded-lg w-full md:w-[65%]">
          {seasonYearData?.seasonIntroMd && (
            <div className="intro-text-container max-w-prose text-left">
              <Markdown>{seasonYearData.seasonIntroMd.text}</Markdown>
              {seasonYearData.seasonIntroMd.author && (
                <div className="author text-right mt-4">–{seasonYearData.seasonIntroMd.author}</div>
              )}
            </div>
          )}
        </div>
        <div className="season-concerts-list z-10 relative h-fit p-2 md:p-4 flex flex-col items-center justify-center lg:max-w-[65%] w-full">
          {seasonYearData?.concertIds?.map((concertId) => {
            const concertData = getConcertData(concertId);
            const venueAndDate = concertData?.dates && concertData.dates.length > 0 ? concertData.dates : null;

            const splitTitle = splitTitleAndSource(concertData?.concertTitle);
            return (
              <div key={concertId} className="concert-container w-full flex flex-col items-start gap-2 border-b-2 py-8" style={{borderColor: seasonColors.secondary}}>
                <div className="concert-title-container text-left ">
                  <div className="text-2xl font-serif italic" style={{ color: seasonColors.primary }}>
                    {splitTitle.concertTitle}
                  </div>
                  <div className="quote-source text-right uppercase font-bold text-shadow-lg" style={{ color: seasonColors.tertiary, textShadow: "0px 0px 2px rgb(0 0 0 / 0.3)" }}>
                    {splitTitle.quoteSource}
                  </div>
                </div>
                <div className="venue-date-time-container font-serif">
                  {venueAndDate &&
                    venueAndDate.map((event, index) => (
                      <div key={index} className="venue-date-time flex flex-col md:flex-row">
                        <div className="venue mr-[1ch]">
                          <span style={{ color: seasonColors.tertiary, fontVariantCaps: "small-caps",textShadow: "0px 0px 3px rgb(0 0 0 / 0.3)" }}>
                            {getVenueString(event.venueId)}{" "}
                          </span>
                          <span className="whitespace-nowrap">
                            <span style={{ color: seasonColors.primary }}>
                              {new Date(event.date).toLocaleDateString("en-US", { weekday: "long" })},{" "}
                            </span>
                            <span style={{ color: seasonColors.primary }}>
                              {new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                              ,{" "}
                            </span>
                            <span style={{ color: seasonColors.primary }}>
                              {formatEventTime(event.time, "hour-only")}
                            </span>
                          </span>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="program-musicians-container w-full flex flex-col md:flex-row items-stretch justify-end gap-8 mt-4">
                  <div className="program-container flex flex-col w-full h-full items-start justify-start">
                    {concertData?.program && (
                      <div className="program-list flex flex-col justify-end items-end w-full text-right">
                        {concertData.program.map((workId, index) => {
                          const workDetails = getWorkDetails(workId);
                          return (
                            <div key={index} className="work-details font-serif">
                              <span className="work-name" style={{ color: seasonColors.primary }}>
                                {workDetails.workName}
                              </span>
                              <span className="composer-name whitespace-nowrap" style={{ color: seasonColors.tertiary, textShadow: "0px 0px 2px rgb(0 0 0 / 0.3)" }}>
                                {"—"}
                                {workDetails.composerName}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                    {concertData?.musicians && (
                      <div className="musicians-container font-serif flex flex-col">
                        {concertData.musicians.map((musicianId, index) => {
                          const musicianName = getMusicianNames({ musicians: [musicianId] })[0] || musicianId;
                          return (
                            <div
                              key={index}
                              className="musician-name font-bold text-sm whitespace-nowrap"
                              style={{ color: seasonColors.primary }}
                            >
                              {musicianName}
                            </div>
                          );
                        })}
                      </div>
                    )}

                                </div>
                </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
