import StatementJeff from '@/components/StatementJeff';
import StatementMark from '@/components/StatementMark';

export default function MessageFromFounder({}) {
  return (
    <div className="section-landing flex flex-col justify-center items-center px-4">
      <div className="message-box-container">
        <div className="message-box-left">
          <StatementJeff />
        </div>
        <div className="message-box-right">
          <StatementMark />
        </div>
      </div>
    </div>
  );
}
