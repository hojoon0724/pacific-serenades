import ConcertBlock from './ConcertBlock';

export default function SeasonComponent({ season }) {
  return (
    <div className="season-container">
      {season.map(concert => {
        <ConcertBlock concert={concert} />;
      })}
    </div>
  );
}
