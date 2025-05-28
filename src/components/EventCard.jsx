import Image from "next/image";

export default function EventCard({ event, isLandingPage }) {
  // Extract date string (YYYY-MM-DD) from event.dates[0].date
  const dateOnly = event.dates[0].date.split("T")[0]; // "2025-06-13"

  // Extract time string from event.dates[0].time (e.g. "19:30")
  const timeString = event.dates[0].time; // "19:30"

  // Combine date + time to create a full Date object in local time (Los Angeles)
  // The timeString is assumed to be in LA time zone already
  const [hours, minutes] = timeString.split(":").map(Number);
  const [year, month, day] = dateOnly.split("-").map(Number);

  // Create date in local time (JS months are zero-based)
  const eventDate = new Date(year, month - 1, day, hours, minutes);

  const currentDate = new Date();
  const isPastEvent = eventDate < currentDate;

  // Format composer name from camelCase to proper name
  const formatComposerName = (composerKey) => {
    if (!composerKey) return "";

    return composerKey
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // Metadata for works
  const getWorkMetadata = (workId) => {
    const specialWorks = {
      halvorsenHandelPassacaglia: {
        displayComposer: "Johan Halvorsen / George Frideric Handel",
      },
      nesterovStringQuartet: {
        isWorldPremiere: true,
      },
    };

    return specialWorks[workId] || {};
  };

  const renderProgramItem = (work, index) => {
    const workId = event.program && event.program[index];
    const metadata = workId ? getWorkMetadata(workId) : {};

    let composerDisplay = metadata.displayComposer;
    if (!composerDisplay && work.workComposer) {
      composerDisplay = formatComposerName(work.workComposer);
    }

    return (
      <>
        {composerDisplay && <>{composerDisplay} - </>}
        {work.workName}
        {metadata.isWorldPremiere && <em className="text-green-600"> (World Premiere)</em>}
      </>
    );
  };

  return (
    <div
      className={`event-container w-full relative bg-white rounded-2xl shadow-lg overflow-hidden transition-shadow duration-300 ${
        isLandingPage ? "bg-opacity-90 shadow-xl backdrop-blur-sm border border-white/20" : ""
      }`}
    >
      <div
        className={`event-photo h-48 w-full relative ${!event.imageUrl ? "" : "bg-gray-100"}`}
        style={
          !event.imageUrl
            ? {
                background: "linear-gradient(160deg, #04b0df, #00bdcc, #00c7b3, #54ce98, #85d27d, #aed46a, #d1d56a)",
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
              <h3 className="text-white text-xl font-medium italic px-4 text-center">{event.concertTitle}</h3>
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
          {eventDate.toLocaleString("en-US", {
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

        {!isLandingPage && (
          <div className="event-program border-t border-b border-gray-200 py-4 mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Program</h3>
            <ul className="program-list space-y-2.5 text-gray-600">
              {event.programDetails && event.programDetails.length > 0 ? (
                event.programDetails.map((work, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-2"></span>
                    <span>{renderProgramItem(work, index)}</span>
                  </li>
                ))
              ) : (
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-2"></span>
                  <span>Program details to be announced</span>
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="tickets-container flex justify-end">
          {event.ticketsUrl ? (
            isPastEvent ? (
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
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
