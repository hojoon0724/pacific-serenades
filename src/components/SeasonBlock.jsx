import { Accordion, AccordionItem } from '@nextui-org/react';

export default function SeasonBlock({ season }) {
  console.log(season);
  return (
    <Accordion variant="splitted">
      <AccordionItem key={season[0].id} className="season-container" aria-label={season[0].id} title={season[0].id}>
        {/* <div className="season-title text-2xl mt-8">{season[0].id}</div> */}
        {season.map(concert => {
          return (
            <div className="concert-container" key={concert.concertTitle}>
              <div className="concert-title">{concert.concertTitle}</div>
              {concert.program.map((work, index) => {
                return (
                  <div className="composition-container grid grid-cols-2" key={index}>
                    <div className="composer-name pr-4">{work.composer}</div>
                    <div className="work-name">{work.work}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </AccordionItem>
    </Accordion>
  );
}
