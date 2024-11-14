import SeasonBlock from '@/components/SeasonBlock';
import seasonData from '@/data/seasonConcertsList.json';
import concertsData from '@/data/concertsData.json';
import worksData from '@/data/worksData.json';
import composersData from '@/data/composersData.json';
import CapitalizeTitle from '@/components/CapitalizeTitle';

export default function PastSeasons() {
  return (
    <div className="all-seasons-container grid grid-cols-3">
      {Object.entries(seasonData).map(([season, concerts]) => {
        return (
          <section className="season mb-8" key={season.slice(0, 4)}>
            <div className="season-container flex flex-col">
              <div className="season-name font-bold underline underline-offset-4 mt-6">{season}</div>
              <div className="concerts-container">
                {concerts.map(concertId => {
                  return (
                    <div className="concert-container pb-4" key={concertId}>
                      <div className="concert-title" key={concertsData[concertId].id}>
                        <CapitalizeTitle str={concertsData[concertId].concertTitle} />
                      </div>
                      {concertsData[concertId].program.map((work, index) => {
                        return (
                          <div className="concert-program-work pb-2" key={index}>
                            {worksData[work].workName} by {composersData[worksData[work].workComposer].fullName}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

/*
<div className="all-seasons-list">
        {allConcerts.map((season, index) => (
          <div className="season-container my-6" key={index}>
            
            {Object.keys(season).map(key => (
              // season[key] = array of concerts
              <SeasonBlock season={season[key]} key={index} />
            ))}
          </div>
        ))}
      </div>

*/
