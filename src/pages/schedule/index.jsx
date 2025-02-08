import SeasonBlock from '@/components/SeasonBlock';
import seasonData from '@/data/seasonConcertsList.json';
import concertsData from '@/data/concertsData.json';
import worksData from '@/data/worksData.json';
import composersData from '@/data/composersData.json';
import CapitalizeTitle from '@/components/CapitalizeTitle';

export default function Schedule() {
  return (
    <div className="top-container flex flex-col items-center justify-center">
      <h1>Schedule</h1>
      <div className="schedule-container py-4">
        <div
          className="schedule-block flex items-center justify-center uppercase"
          style={{ width: '90svw', height: '40vh', border: '1px solid red' }}
        >
          concert schedule block here
        </div>
      </div>
    </div>
  );
}
