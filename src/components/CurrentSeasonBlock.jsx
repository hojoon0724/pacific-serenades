import Image from "next/image";

export default function CurrentSeason({ currentSeason }) {
  return (
    <div className="w-full min-h-[60svh] flex flex-col justify-center items-center py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 border-b-2 border-green-500 pb-2">
        Current Season
      </h1>
      <section className="container mx-auto max-w-5xl">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="current-season-events-container flex flex-col gap-12">
            {currentSeason.length === 0 ? (
              <div
                className="no-events-message p-8 rounded-xl shadow-md relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(to bottom, #04b0df, #00bdcc, #00c7b3, #54ce98, #85d27d, #aed46a, #d1d56a)",
                  filter: "brightness(1.1)",
                }}
              >
                <div className="absolute inset-0 bg-[url('/backgrounds/pattern-overlay.svg')] opacity-10 mix-blend-overlay"></div>
                <h2 className="text-center text-xl text-white font-medium relative z-10">
                  Exciting events are on the horizon&mdash;stay tuned for what&apos;s coming up!
                </h2>
              </div>
            ) : (
              currentSeason.map((event, index) => {
                return (
                  <div
                    key={index}
                    className="event-container w-full relative bg-white rounded-2xl shadow-lg overflow-hidden transition-shadow duration-300"
                  >
                    <div
                      className={`event-photo h-48 w-full relative ${!event.imageUrl ? "" : "bg-gray-100"}`}
                      style={
                        !event.imageUrl
                          ? {
                              background:
                                "linear-gradient(160deg, #04b0df, #00bdcc, #00c7b3, #54ce98, #85d27d, #aed46a, #d1d56a)",
                              filter: "brightness(0.9)",
                            }
                          : {}
                      }
                    >
                      {event.imageUrl ? (
                        <Image
                          src={event.imageUrl}
                          alt={event.concertTitle}
                          width={960}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          <div className="w-full h-full flex items-center justify-center relative z-10">
                            <h3 className="text-white text-xl font-medium italic px-4 text-center">
                              {event.concertTitle}
                            </h3>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="event-details flex flex-col p-6">
                      <div className="event-title text-2xl font-semibold mb-4 text-gray-800">{event.concertTitle}</div>
                      <div className="event-date flex items-center text-gray-600 mb-2">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        {new Date(event.dates[0].date).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </div>
                      <div className="event-venue flex items-center text-gray-600 mb-4">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                        {event.dates[0].venue}
                      </div>

                      <div className="event-program border-t border-b border-gray-200 py-4 mb-6">
                        <h3 className="text-lg font-medium text-gray-700 mb-3">Program</h3>
                        <ul className="program-list space-y-2.5 text-gray-600">
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-2"></span>
                            <span>Johan Halvorsen / George Frideric Handel - Passacaglia (for Violin &amp; Cello)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-2"></span>
                            <span>
                              Sergey Nesterov - String Quartet <em className="text-green-600">(World Premiere)</em>
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-2"></span>
                            <span>Alexander Borodin - String Quartet No. 2 in D Major</span>
                          </li>
                        </ul>
                      </div>

                      <div className="tickets-container flex justify-end">
                        {event.ticketsUrl
                          ? (() => {
                              const eventDate = new Date(event.dates[0].date);
                              const currentDate = new Date();
                              const isPastEvent = eventDate < currentDate;

                              return isPastEvent ? (
                                <div className="event-tickets bg-gray-300 text-gray-600 px-6 py-3 rounded-md font-bold cursor-not-allowed flex items-center">
                                  <span>Event Passed</span>
                                </div>
                              ) : (
                                <a href={event.ticketsUrl} className="inline-block">
                                  <div className="event-tickets bg-blue-500 text-black px-6 py-3 rounded-md font-bold transition-all hover:bg-blue-600 hover:shadow-md flex items-center">
                                    <span>Get Tickets</span>
                                    <svg
                                      className="w-4 h-4 ml-2"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                      ></path>
                                    </svg>
                                  </div>
                                </a>
                              );
                            })()
                          : ""}
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
