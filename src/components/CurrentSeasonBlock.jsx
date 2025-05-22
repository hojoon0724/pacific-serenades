export default function CurrentSeason({}) {
  const seasonDetails = [
    // {
    //   id: "borodinNesterov",
    //   year: "2025",
    //   concertTitle: "Borodin & Nesterov featuring the California String Quartet",
    //   dates: [
    //     {
    //       date: "2025-06-13T02:30:00Z",
    //       time: "19:30",
    //       venue: "Schoenberg Hall, UCLA Herb Alpert School of Music",
    //       venueId: "schoenbergHall",
    //     },
    //   ],
    //   program: ["halvorsenHandelPassacaglia", "nesterovStringQuartet", "borodinStringQuartet"],
    //   musicians: ["californiaStringQuartet"],
    //   ticketsUrl: "www.google.com",
    // },
    // {
    //   id: "amalHope",
    //   year: "2024",
    //   concertTitle: "Amal/Hope: Bending Space, Crossing Time",
    //   dates: [
    //     {
    //       date: "2024-10-19T03:00:00Z",
    //       time: "20:00",
    //       venue: "Zipper Hall at the Colburn School",
    //       venueId: "zipperHallColburn",
    //     },
    //   ],
    //   program: [
    //     "krykaBachBwv552",
    //     "krykaCentennialVar",
    //     "krykaBachWellTemperedClavier1Cmajor",
    //     "krykaSalaamShalomPeace",
    //     "krykaElectricRainbow",
    //   ],
    //   musicians: ["duoAmal"],
    //   ticketsUrl: "www.google.com",
    // },
  ];

  return (
    <div className="w-full min-h-[70svh] flex flex-col justify-center items-center">
      <h1 className="py-8 text-center">Current Season</h1>
      <section>
        <div className="w-full p-5">
          <div className="current-season-events-container flex flex-col gap-12">
            {seasonDetails.length === 0 ? (
              <div className="no-events-message">
                <h2 className="text-center">Exciting events are on the horizon—stay tuned for what’s coming up!</h2>
              </div>
            ) : (
              seasonDetails.map((event, index) => {
                return (
                  <div key={index} className="event-container w-full relative">
                    <div className="event-photo absolute w-full"></div>
                    <div className="event-details flex flex-col">
                      <div className="event-title text-2xl mb-4">{event.concertTitle}</div>
                      <div className="event-date">
                        {new Date(event.dates[0].date).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </div>
                      <div className="event-venue">{event.dates[0].venue}</div>
                      <div className="tickets-container flex flex-col items-end">
                        {event.ticketsUrl ? (
                          <a href={event.ticketsUrl}>
                            <div className="event-tickets bg-green-400 px-8 py-4 mt-4 w-fit rounded-xl transition-all hover:bg-green-700 hover:text-white">
                              Tickets
                            </div>
                          </a>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
