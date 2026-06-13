import seasonData from "@/data/serving/seasons.json";
import { formatEventTime, getConcertData, getMusicianNames, getVenueString, getWorkDetails } from "@/utils/getDetails";
import Image from "next/image";
import Markdown from "react-markdown";

const seasonColors = seasonData.find((season) => season.year === "2006")?.["season-theme"] || {};

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
export function Season2006({ seasonYearData }) {
  return (
    <div
      className="season-container relative w-full h-full min-h-0 flex-1 flex flex-col items-start rounded-xl overflow-y-auto [container-type:size]"
      style={{ backgroundColor: seasonColors["background"] }}
    >
      <div className="season-landing pointer-events-none min-h-full w-full inset-0 flex justify-center items-center relative">
        <div className="landing-bg-image-container w-full h-full absolute inset-0 flex justify-center items-center">
          <Image
            src={`/graphics/seasons/2006/2006-bg-landing.png`}
            alt={`Season ${seasonYearData?.year} landing background`}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className="landing-content-container w-[100cqmin] h-[100cqmin] max-w-full max-h-full relative aspect-square">
          <Image
            className="w-full px-[20%] absolute translate-y-[5%]"
            src={`/graphics/seasons/2006/2006-season-name-bg.svg`}
            alt={`Season ${seasonYearData?.year} landing background`}
            fill
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
          <Image
            className="w-full px-[20%] absolute"
            src={`/graphics/seasons/2006/2006-season-title.svg`}
            alt={`Season ${seasonYearData?.year} landing background`}
            fill
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </div>
      </div>
      <div className="season-content relative z-10 min-h-full self-stretch">
        <div className="section-1-container grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 w-full mb-8 relative p-2 md:p-4">
          <div className="season-hands-image-container w-full md:sticky md:top-0 md:self-start md:max-h-[100cqh]">
            <Image
              className="w-full min-w-56 h-auto md:w-auto md:max-w-full md:max-h-[100cqh]"
              src={`/graphics/seasons/2006/2006-element-1.svg`}
              alt={`Season ${seasonYearData?.year} hands graphic`}
              width={1200}
              height={800}
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
          </div>
          <div
            className="season-message z-10 relative h-fit px-2 py-1 md:p-4 md:py-2 flex items-center justify-center rounded-lg w-full md:max-w-prose"
            style={{ color: seasonColors["tertiary"] }}
          >
            {seasonYearData?.seasonIntroMd && (
              <div className="intro-text-container max-w-prose text-left">
                <Markdown>{seasonYearData.seasonIntroMd.text}</Markdown>
                {seasonYearData.seasonIntroMd.author && (
                  <div className="author text-right mt-4">–{seasonYearData.seasonIntroMd.author}</div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="season-concerts-container relative w-full min-h-full flex flex-col items-start overflow-clip">
          <div className="season-bg-container pointer-events-none sticky top-0 w-full inset-0">
            <div className="w-full h-full relative">
              <Image
                className="absolute top-0 right-0 w-full translate-x-[15%] h-[100cqh]"
                src="/graphics/seasons/2006/2006-bg-right.png"
                alt={`Season ${seasonYearData?.year} Background`}
                width={1200}
                height={800}
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
            <Image
              className="absolute top-0 w-full"
              src="/graphics/seasons/2006/2006-bg-top.png"
              alt={`Season ${seasonYearData?.year} Background`}
              width={1200}
              height={800}
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
          </div>
          <div className="season-concerts-list relative z-10 p-2 md:p-4 flex flex-col items-start justify-start h-full w-full">
            <div className="season-logo-container relative w-full h-[40cqw]">
              <Image
                className="w-full px-[20%] translate-y-[5%]"
                src={`/graphics/seasons/2006/2006-season-name-bg.svg`}
                alt={`Season ${seasonYearData?.year} landing background`}
                fill
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
              <Image
                className="w-full px-[20%]"
                src={`/graphics/seasons/2006/2006-season-title.svg`}
                alt={`Season ${seasonYearData?.year} landing background`}
                fill
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>
            {seasonYearData?.concertIds?.map((concertId) => {
              const concertData = getConcertData(concertId);
              const venueAndDate = concertData?.dates && concertData.dates.length > 0 ? concertData.dates : null;

              const splitTitle = splitTitleAndSource(concertData?.concertTitle);
              return (
                <div
                  key={concertId}
                  className="concert-container w-full flex flex-col items-start gap-2 border-b-2 py-8"
                  style={{ borderColor: seasonColors.secondary }}
                >
                  <div className="concert-title-container text-left ">
                    <div className="text-4xl" style={{ color: seasonColors.tertiary }}>
                      {splitTitle.concertTitle}
                    </div>
                    <div
                      className="quote-source text-right uppercase font-bold text-shadow-lg"
                      style={{ color: seasonColors.tertiary, textShadow: "0px 0px 2px rgb(0 0 0 / 0.3)" }}
                    >
                      {splitTitle.quoteSource}
                    </div>
                  </div>
                  <div className="venue-date-time-container">
                    {venueAndDate &&
                      venueAndDate.map((event, index) => (
                        <div
                          key={index}
                          className="venue-date-time flex flex-col md:flex-row"
                          style={{
                            color: seasonColors.tertiary,
                            fontVariantCaps: "small-caps",
                            textShadow: "0px 0px 3px rgb(0 0 0 / 0.3)",
                          }}
                        >
                          <div className="venue mr-[1ch]">
                            <span className="whitespace-nowrap">
                              <span>{new Date(event.date).toLocaleDateString("en-US", { weekday: "long" })}, </span>
                              <span>
                                {new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                                ,{" "}
                              </span>
                              <span>{formatEventTime(event.time, "hour-minute")} at </span>
                            </span>
                            <span>{getVenueString(event.venueId)} </span>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="program-musicians-container w-full flex flex-col md:flex-row items-stretch justify-start gap-8 mt-4">
                    {concertData?.program && (
                      <div className="program-container flex flex-col h-full items-start justify-start">
                        <table>
                          <tbody>
                            {concertData.program.map((workId) => {
                              const workDetails = getWorkDetails(workId);
                              return (
                                <tr key={workId} className="work-details">
                                  <td
                                    className="composer"
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
