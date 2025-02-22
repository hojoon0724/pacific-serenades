import ProgramLine from '../components/ProgramLine';

export default function ConcertBlock({ concert }) {
  // console.log('concert block', concert);
  // console.log('program object', concert.program);
  // console.log('program index 0', concert.program[0]);
  // console.log('work composer', concert.program[0].composer);
  return (
    <>
      <div className="concert-title">{concert.concertTitle}</div>
      <div className="concert-program-container">
        <div className="concert-program-container flex flex-col">
          <h2>Program</h2>
          <div className="program-grid">
            {concert.program.map(work => {
              return <ProgramLine work={work} key={`${work.composer}${work.work}`} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
