import composersData from "@/data/serving/composersData.json";
import concertsData from "@/data/serving/concertsData.json";
import musiciansData from "@/data/serving/musiciansData.json";
import venuesData from "@/data/serving/venues.json";
import worksData from "@/data/serving/worksData.json";

export function getConcertData(concertId) {
  const concert = concertsData.find((c) => c.id === concertId);
  if (!concert) return null;
  return concert;
}

export function getVenueString(venueId) {
    const venue = venuesData.find((v) => v.id === venueId);
    if (!venue) return "";
    return venue.str || venueId || "";
}

export function getWorkDetails(workId) {
  const work = worksData[workId];
  if (!work) return { workName: workId, composerName: "", instrumentation: "" };
  const composerId = work.workComposer;
  const composerName = composersData[composerId]?.fullName || composerId || "";
  return {
    workName: work.workName || workId,
    composerName,
    instrumentation: work.instrumentation || "",
  };
}

export function getMusicianNames(concert) {
  if (!concert?.musicians) return [];
  return concert.musicians.map((musicianId) => musiciansData[musicianId]?.fullName || musicianId);
}

export function getProgramDetails(concert) {
  if (!concert?.program) return [];
  const programDetails = concert.program.map((workId) => getWorkDetails(workId));
  const musiciansNames = getMusicianNames(concert);
  return programDetails.map((work) => ({
    ...work,
    musicians: musiciansNames,
  }));
}

export function formatEventTime(timeValue, format ) {
  if (!timeValue) return "";
  const [hours = 0, minutes = 0] = timeValue.split(":").map(Number);
  const time = new Date(2000, 0, 1, hours, minutes);

  switch (format) {
    case "hour-minute":
      return time.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
    case "hour-only":
      return time.toLocaleTimeString("en-US", {
        hour: "numeric",
      });
    default:
      return time.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
  }
}