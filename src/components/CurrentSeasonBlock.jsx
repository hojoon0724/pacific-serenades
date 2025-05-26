import EventCard from "./EventCard";

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
              currentSeason.map((event, index) => <EventCard key={index} event={event} />)
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
