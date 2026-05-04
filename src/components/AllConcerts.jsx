import concertsData from "@/data/serving/concertsData.json";
import seasonsData from "@/data/serving/seasons.json";

// concertsData is an array; build a lookup map by id
const concertsById = concertsData.reduce((acc, concert) => {
  acc[concert.id] = concert;
  return acc;
}, {});

export default function AllConcerts() {
  return (
    <div className="top-container mx-4">
      {Object.entries(seasonsData).map(([season, seasonObj]) => (
        <section className="my-8" key={season}>
          <h1>{season}</h1>
          {(seasonObj.concertIds || []).map((concertKey) => {
            const concertDetails = concertsById[concertKey];

            if (!concertDetails) {
              return (
                <div className="season-page-concert-title" key={concertKey}>
                  <p>Concert data not found for key: &apos;{concertKey}&apos;</p>
                </div>
              );
            }

            return (
              <div className="season-page-concert-title" key={concertKey}>
                <p>Concert Title: {concertDetails.concertTitle}</p>
                <div>
                  <h2>Dates:</h2>
                  {(concertDetails.dates || []).map((dateObj, index) => (
                    <div className="flex" key={index}>
                      <div className="venue">Venue: {dateObj.venueId}</div>
                      <div className="datetime">Date &amp; Time: {dateObj.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
}
