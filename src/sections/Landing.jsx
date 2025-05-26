import EventCard from "@/components/EventCard";
import concertsData from "@/data/concertsData.json";
import seasonConcertsList from "@/data/seasonConcertsList.json";
import worksData from "@/data/worksData.json";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  // Get the next upcoming event from current season
  const getUpcomingEvent = () => {
    const currentSeasonKeys = seasonConcertsList.current;
    const now = new Date();
    let upcomingEvent = null;

    // Check each concert in the current season
    for (const concertKey of currentSeasonKeys) {
      if (concertsData[concertKey]) {
        const concert = { ...concertsData[concertKey] };

        // Add program details
        if (concert.program && Array.isArray(concert.program)) {
          concert.programDetails = concert.program.map(
            (workId) => worksData[workId] || { workName: workId, instrumentation: "" }
          );
        }

        // Check if the event is in the future
        const eventDate = new Date(concert.dates[0].date);
        if (eventDate > now) {
          // If this is the first future event we've found, or if it's earlier than our current upcoming event
          if (!upcomingEvent || eventDate < new Date(upcomingEvent.dates[0].date)) {
            upcomingEvent = concert;
          }
        }
      }
    }

    return upcomingEvent;
  };

  const upcomingEvent = getUpcomingEvent();

  return (
    <div className="landing-container w-full h-full relative">
      <div className="landing-background fixed top-0 left-0 w-full h-screen z-0">
        <div className="landing-container w-full h-screen flex flex-col items-center justify-center relative">
          {upcomingEvent && (
            <div className="upcoming-event-container relative z-10 w-full max-w-xl px-4">
              <div className="w-full">
                <EventCard event={upcomingEvent} isLandingPage={true} />
              </div>
              <div className="text-center mt-4">
                <Link
                  href="/schedule"
                  className="bg-blue-100 hover:bg-blue-600 transition-colors text-black hover:text-white px-6 py-3 rounded-full inline-block font-bold w-full"
                >
                  View All Concerts
                </Link>
              </div>
            </div>
          )}
          <div className="landing-background absolute inset-0 z-0">
            <Image
              className="object-cover h-full w-full"
              src="/backgrounds/home-bg.jpg"
              alt="landing page background image"
              width={2500}
              height={2000}
              priority
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </div>
    //
  );
}
