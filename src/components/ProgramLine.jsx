export default function ProgramLine({ work }) {
  return (
    <div className="program-line-container">
      <div className="program-first-line grid grid-cols-2 mt-2">
        <div className="program-composer">{work.composer}</div>
        <div className="program-work">{work.work}</div>
      </div>
      {work.commissionedBy ? <div className="program-commissioned-by">{work.commissionedBy}</div> : ''}
    </div>
  );
}
