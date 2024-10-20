import PacSerWideLockup from '@/components/PacSerWideLockup';
import StatementJeff from '@/components/StatementJeff';
import StatementMark from '@/components/StatementMark';
import WaveBg from '@/components/WaveBg';

export default function Landing({}) {
  return (
    <section className="section-landing flex flex-col justify-center items-center">
      <div className="message-box-container">
        <div className="message-box-left w-6/12">
          <StatementJeff />
        </div>
        <div className="message-box-right w-6/12">
          <StatementMark />
        </div>
      </div>
    </section>
  );
}
