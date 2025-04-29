import CapitalizeTitle from "@/components/CapitalizeTitle";
import composersData from "@/data/composersData.json";
import concertsData from "@/data/concertsData.json";
import seasonData from "@/data/seasonConcertsList.json";
import worksData from "@/data/worksData.json";
import React from "react";

export default function PastSeasons({ bgColor }) {
  return (
    <section className={`w-full flex flex-col items-center pt-8 mb-0 ${bgColor}`}>
      <h1>Past Seasons</h1>
      <div className="past-season-year-buttons-container flex flex-wrap justify-center gap-4 p-4 w-fit mt-4 max-width">
        {Object.entries(seasonData.past).map(([season, concerts]) => {
          return (
            <a
              href={`#${season.slice(0, 4)}`}
              key={season.slice(0, 4)}
              className="px-4 py-1 rounded-xl bg-green-400 transition-all hover:bg-green-800 hover:text-white"
            >
              {season.slice(0, 4)}
            </a>
          );
        })}
      </div>
      <div className="all-seasons-container grid grid-cols-1 gap-8 m-2 mt-8 sm:m-8">
        {Object.entries(seasonData.past).map(([season, concerts]) => {
          return (
            <div className="season" id={season.slice(0, 4)} key={season.slice(0, 4)}>
              <div className="season-container bg-blue-50 p-4 rounded-xl">
                <div className="season-name text-xl font-bold bg-blue-700 rounded-lg px-4 py-2 text-blue-50">
                  {season}
                </div>
                <div className="concerts-container w-full">
                  {concerts.map((concertId) => {
                    return (
                      <div
                        className="concert-container bg-teal-100 px-4 py-2 mt-4 rounded-lg border-1 border-blue-300"
                        key={concertId}
                      >
                        <h5 className="concert-title text-blue-800 pb-4" key={concertsData[concertId].id}>
                          <CapitalizeTitle str={concertsData[concertId].concertTitle} />
                        </h5>
                        <div className="concert-program-work-container grid items-center gap-0 sm:gap-2 sm:grid-cols-[max-content_min-content_auto]">
                          {concertsData[concertId].program.map((work, index) => {
                            return (
                              // <div className="concert-program-work flex w-full" key={index}>
                              <React.Fragment key={work}>
                                <div className="concert-program-work-composer pt-4 sm:w-max sm:pt-0 w-fit">
                                  {composersData[worksData[work].workComposer].fullName}
                                </div>
                                <div className="hidden sm:flex divider w-1 px-2">
                                  |
                                </div>
                                <div className="concert-program-work-title w-full pt-0">
                                  {worksData[work].workName}
                                </div>
                              </React.Fragment>
                              // </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
