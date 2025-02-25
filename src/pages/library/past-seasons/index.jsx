import SeasonBlock from "@/components/SeasonBlock";
import seasonData from "@/data/seasonConcertsList.json";
import concertsData from "@/data/concertsData.json";
import worksData from "@/data/worksData.json";
import composersData from "@/data/composersData.json";
import CapitalizeTitle from "@/components/CapitalizeTitle";

export default function PastSeasons() {
  return (
    <div className="flex flex-col items-center mt-8">
    <h1>Past Seasons</h1>
    <div className="all-seasons-container grid grid-cols-1 gap-8 m-2 mt-8 sm:m-8">
      {Object.entries(seasonData).map(([season, concerts]) => {
        return (
          <div className="season" key={season.slice(0, 4)}>
            <div className="season-container bg-blue-50 p-4 rounded-xl">
              <div className="season-name text-xl font-bold bg-blue-700 rounded-lg px-4 py-2 text-blue-50">
                {season}
              </div>
              <div className="concerts-container">
                {concerts.map((concertId) => {
                  return (
                    <div
                      className="concert-container bg-teal-100 px-4 py-2 mt-4 rounded-lg border-1 border-blue-300"
                      key={concertId}
                    >
                      <h5 className="concert-title text-blue-800 pb-4" key={concertsData[concertId].id}>
                        <CapitalizeTitle str={concertsData[concertId].concertTitle} />
                      </h5>
                      <div
                        className="concert-program-work-container grid items-center gap-0 sm:gap-2 sm:grid-cols-[min-content_min-content_auto]"
                      >
                        {concertsData[concertId].program.map((work, index) => {
                          return (
                            // <div className="concert-program-work flex w-full" key={index}>
                            <>
                              <div className="concert-program-work-composer pt-4 sm:w-max sm:pt-0">
                                {composersData[worksData[work].workComposer].fullName}
                              </div>
                              <div className="hidden sm:flex divider w-1 px-2">|</div>
                              <div className="concert-program-work-title w-full pt-0">{worksData[work].workName}</div>
                            </>
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
    </div>
  );
}
