import SeasonBlock from '@/components/SeasonBlock';
import allConcerts from '@/data/allConcerts.json';

export default function PastSeasons() {
  return (
    <section>
      <div className="all-seasons-list">
        {allConcerts.map((season, index) => (
          <div className="season-container my-6" key={index}>
            {/* season returns an object with key being the season name */}
            {Object.keys(season).map(key => (
              // season[key] = array of concerts
              <SeasonBlock season={season[key]} key={index} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
