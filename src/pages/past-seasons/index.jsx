import SeasonBlock from '@/components/SeasonBlock';
import seasonData from '@/data/seasonConcertsList.json';

export default function PastSeasons() {
  return (
    <div className="all-seasons-container">
      {Object.entries(seasonData).map(([season, concerts]) => {
        console.log(season);
        console.log(concerts);
      })}
      <section className="season"></section>;
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
