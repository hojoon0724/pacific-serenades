import ConcertBlock from '@/components/ConcertBlock';
import testData from '../../data/sampleConcert.json';

export default function PastConcerts({ concert }) {
  const sampleConcert = testData[0]['2013 Season'];
  // console.log(sampleConcert);
  return (
    <section>
      <div className="season-container">
        <div className="concert-container">
          <ConcertBlock concert={sampleConcert[0]} />
        </div>
      </div>
    </section>
  );
}
