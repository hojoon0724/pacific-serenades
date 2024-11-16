import concertsData from '@/data/concertsData.json';
import composersData from '@/data/composersData.json';
import worksData from '@/data/worksData.json';

export default function ConcertCard({ concert }) {
  return (
    <div className="concert-card-container">
      <div className="concert-title">{concert.concertTitle}</div>
      <div className="concert-program-container">
        {concert.program.map(work => {
          <div className="work-container">
            <div className="work-composer">{composersData[worksData[work][workComposer]][fullName]}</div>
            <div className="work-work-name">{worksData[work][workName]}</div>
          </div>;
        })}
      </div>
    </div>
  );
}
