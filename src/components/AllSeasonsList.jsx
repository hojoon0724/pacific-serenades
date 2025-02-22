import allConcerts from '@/data/allConcerts.json';

export default function AllSeasonsList({}) {
  return (
    <div className="all-seasons-list">
      {allConcerts.map(season => {
        console.log(season);
      })}
    </div>
  );
}
