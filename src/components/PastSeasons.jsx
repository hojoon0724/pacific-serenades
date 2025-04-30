import CapitalizeTitle from "@/components/CapitalizeTitle";
import composersData from "@/data/composersData.json";
import concertsData from "@/data/concertsData.json";
import seasonData from "@/data/seasonConcertsList.json";
import worksData from "@/data/worksData.json";
import React from "react";

export default function PastSeasons({ bgColor }) {
  return (
    <section className={`w-screen flex flex-col items-center pt-8 mb-0 ${bgColor}`}>
      <h1>Past Seasons</h1>
      <div className="past-season-year-buttons-container flex flex-wrap justify-center gap-4 p-4 w-fit mt-4 max-width">
        {Object.entries(seasonData.past).map(([season, concerts]) => {
          return (
            <a
              href={`#${season.slice(0, 4)}`}
              key={season.slice(0, 4)}
              className="px-4 py-1 rounded-xl bg-green-400 border-b-3 border-green-600 transition-all hover:bg-green-800 hover:text-white"
            >
              {season.slice(0, 4)}
            </a>
          );
        })}
      </div>
      <div className="all-seasons-container grid grid-cols-1 gap-8 m-2 mt-8 sm:m-8 max-width ">
        {Object.entries(seasonData.past).map(([season, concerts]) => {
          return (
            <div className="season shadow-md border-l-4 border-blue-600 rounded-2xl" id={season.slice(0, 4)} key={season.slice(0, 4)}>
              <div className="season-container bg-blue-50/70 p-5 rounded-xl shadow-sm border border-blue-100">
                <div className="season-name text-xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg px-4 py-2.5 text-black shadow-md">
                  {season}
                </div>
                <div className="concerts-container w-full">
                  {concerts.map((concertId) => {
                    return (
                      <div
                        className="concert-container bg-white px-5 py-4 mt-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-3 border-teal-600"
                        key={concertId}
                      >
                        <h5
                          className="concert-title text-lg font-semibold text-blue-800 pb-4"
                          key={concertsData[concertId].id}
                        >
                          <CapitalizeTitle str={concertsData[concertId].concertTitle} />
                        </h5>
                        <div className="concert-program-work-container grid items-center gap-0 sm:gap-2 sm:grid-cols-[max-content_min-content_auto]">
                          {concertsData[concertId].program.map((work, index) => {
                            return (
                              <React.Fragment key={work}>
                                <div className="concert-program-work-composer pt-4 sm:w-max sm:pt-0 w-fit font-medium text-blue-700">
                                  {composersData[worksData[work].workComposer].fullName}
                                </div>
                                <div className="hidden sm:flex divider w-1 px-2 text-gray-400">|</div>
                                <div className="concert-program-work-title w-full pt-0 text-gray-700">
                                  {worksData[work].workName}
                                </div>
                              </React.Fragment>
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
