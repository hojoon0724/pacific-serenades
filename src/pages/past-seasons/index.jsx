import SeasonBlock from '@/components/SeasonBlock';
import allConcerts from '@/data/allConcerts.json';

export default function PastSeasons() {
  return (
    <section>
      <div className="all-seasons-list">
        {allConcerts.map((season, index) => (
          <div className="season-container my-4" key={index}>
            {/* season returns an object with key being the season name */}
            {Object.keys(season).map(key => (
              // key = season name
              // season[key] = array of concerts
              <>
                <div className="season-title text-2xl mt-8">{key}</div>
                <SeasonBlock season={season[key]} key={index} />
              </>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
