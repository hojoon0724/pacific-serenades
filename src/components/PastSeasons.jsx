import ConcertTile from "@/components/ConcertTile";
import seasonData from "@/data/serving/seasons.json";

export default function PastSeasons({ bgColor }) {
  return (
    <section className={`w-screen flex flex-col items-center pt-8 mb-0 ${bgColor}`}>
      <h1>Past Seasons</h1>
      <div className="past-season-year-buttons-container flex flex-wrap justify-center gap-4 p-4 w-fit mt-4 max-width">
        {seasonData.map(({ year }) => {
          return (
            <a
              href={`#${year}`}
              key={year}
              className="px-4 py-1 rounded-xl bg-green-400 border-b-3 border-green-600 transition-all hover:bg-green-800 hover:text-white"
            >
              {year}
            </a>
          );
        })}
      </div>
      <div className="all-seasons-container grid grid-cols-1 gap-8 m-2 mt-8 sm:m-8 max-width ">
        {seasonData.map((season, index) => {
          const { year, concertIds } = season;
          return (
            <div className="season shadow-md border-l-4 border-blue-600 rounded-2xl" id={year} key={year}>
              <div className="season-container bg-blue-50/70 p-5 rounded-xl shadow-sm border border-blue-100">
                <div className="season-name text-xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg px-4 py-2.5 text-black shadow-md">
                  <div className="year-container">
                    {year}
                    {season.subtitle && <span className="subtitle text-base"> ({season.subtitle})</span>}
                  </div>
                </div>
                <div className="concerts-container w-full">
                  {concertIds.map((concertId) => (
                    <ConcertTile key={concertId} concertId={concertId} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
