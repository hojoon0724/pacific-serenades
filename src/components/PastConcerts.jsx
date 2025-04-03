import ConcertBlock from '@/components/ConcertBlock';
import concertsData from '@/data/concertsData.json';
import seasonConcertsList from '@/data/seasonConcertsList.json';

export default function PastConcerts() {
  return (
    <>
      {Object.entries(seasonConcertsList).map(([season, concerts]) => (
        <section className="my-8" key={season}>
          <h1>{season}</h1>
          {concerts.map(concertKey => {
            const concertDetails = concertsData[concertKey];

            // Check if concertDetails exists to avoid errors
            if (!concertDetails) {
              console.log(`not found in concerts DB ${concertKey}`);
              return (
                <div className="season-page-concert-title" key={concertKey}>
                  <p>Concert data not found for key: &apos;{concertKey}&apos;</p>
                </div>
              );
            }

            return (
              <div className="season-page-concert-title" key={concertKey}>
                {/* <p>databaseKey: &apos;{concertKey}&apos;</p> */}
                <p>Concert Title: {concertDetails.concertTitle}</p>
                {/* <p>Year: {concertDetails.year}</p> */}

                <div>
                  <h2>Dates:</h2>
                  {concertDetails.dates.map((dateObj, index) => (
                    <div className="flex" key={index}>
                      <div className="venue">Venue: {dateObj.venue}</div>
                      <div className="datetime">Date & Time:{dateObj.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="season-container">
            <div className="concert-container">
              {/* {concerts.map(
                concertKey =>
                  concertsData[concertKey] && <ConcertBlock key={concertKey} concert={concertsData[concertKey]} />,
              )} */}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
