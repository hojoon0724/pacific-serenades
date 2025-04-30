import MusicianComponent from "@/components/MusicianPage/MusicianComponent";
import concertsData from "@/data/concertsData.json";
import musiciansData from "@/data/musiciansData.json";

export async function getStaticPaths() {
  // File name === [Musician].jsx
  const paths = Object.keys(musiciansData).map((musician) => {
    return { params: { musician: musician } };
  });
  return {
    paths,
    fallback: false, // This returns 404 if the path doesn't exist
  };
}

export async function getStaticProps({ params }) {
  const musician = musiciansData[params.musician];

  // Filter concerts that include this musician
  const musicianConcerts = Object.entries(concertsData)
    .filter(([_, concert]) => concert.musicians && concert.musicians.includes(params.musician))
    .map(([id, concert]) => ({
      id,
      concertTitle: concert.concertTitle,
      year: concert.year,
      dates: concert.dates,
    }));

  return {
    props: {
      musician,
      concerts: musicianConcerts,
    },
  };
}

export default function MusicianDetails({ musician, concerts }) {
  if (!musician) {
    return <p>Musician not found.</p>;
  }

  return (
    <div className="top-container mx-4">
      <MusicianComponent musician={musician} concerts={concerts} />
    </div>
  );
}
