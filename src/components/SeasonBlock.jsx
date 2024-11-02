export default function SeasonBlock({ season }) {
  return (
    <>
      {season.map(concert => {
        return (
          <div className="concert-container" key={concert.concertTitle}>
            <div className="season-title text-xl my-2">{concert.concertTitle}</div>
            {concert.program.map((work, index) => {
              // console.log(work);
              return (
                <div className="composition-container flex" key={index}>
                  <div className="composer-name pr-4">{work.composer}</div>
                  <div className="work-name">{work.work}</div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
