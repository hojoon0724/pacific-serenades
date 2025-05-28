export default function MusicianWorksPerformedSection({ musicianId, concerts }) {
  if (!concerts || concerts.length === 0) {
    return null;
  }

  // Sort concerts by date in descending order (most recent first)
  const sortedConcerts = [...concerts].sort((a, b) => {
    const dateA = a.dates && a.dates.length > 0 ? new Date(a.dates[0].date) : new Date(a.year);
    const dateB = b.dates && b.dates.length > 0 ? new Date(b.dates[0].date) : new Date(b.year);
    return dateB - dateA;
  });

  return (
    <div className="musician-concerts">
      <h5 className="text-xl font-semibold mb-4">Concerts Performed</h5>
      <div className="musician-concerts-list-container">
        <ul className="grid gap-4 md:grid-cols-1">
          {sortedConcerts.map((concert) => (
            <li
              key={concert.id}
              className="concert-item bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
            >
              <div className="concert-header px-4 py-3 bg-blue-50 border-b border-blue-100">
                <h3 className="text-lg font-medium text-blue-800">{concert.concertTitle}</h3>
              </div>

              <div className="concert-details px-4 py-3">
                {concert.dates && concert.dates.length > 0 ? (
                  <div className="concert-dates space-y-1.5">
                    {concert.dates.map(
                      (dateObj, index) =>
                        dateObj.date && (
                          <div className="flex items-start gap-2" key={index}>
                            <div className="flex-shrink-0 mt-1.5">
                              <span className="inline-block h-2 w-2 bg-blue-500 rounded-full"></span>
                            </div>
                            <div className="performance-details">
                              <div className="date text-gray-800 font-medium">
                                {new Date(dateObj.date).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                                })}
                              </div>
                              {dateObj.venue && <div className="venue text-gray-500 text-sm">{dateObj.venue}</div>}
                            </div>
                          </div>
                        )
                    )}
                  </div>
                ) : (
                  <div className="concert-year flex items-center gap-2">
                    <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                    <span className="text-gray-700">{concert.year}</span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
