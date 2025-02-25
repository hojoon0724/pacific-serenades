import musiciansData from "@/data/musiciansData.json";
import worksData from "@/data/worksData.json";
import Image from "next/image";
import Link from "next/link";
import MusicianComponent from "@/components/MusicianPage/MusicianComponent";

export async function getStaticPaths() {
  // File name === [Musician].jsx
  const paths = Object.keys(musiciansData).map((musician) => {
    return { params: { musician: musician } };
  });
  return {
    paths,
    fallback: false, // This returns 404 if the path doesn’t exist
  };
}

export async function getStaticProps({ params }) {
  const musician = musiciansData[params.musician];
  // const works = Object.values(worksData).filter(work => work.workMusician === params.musician);
  // console.log(works);
  return {
    props: {
      musician,
      // works,
    },
  };
}

export default function MusicianDetails({ musician }) {
  if (!musician) {
    return <p>Musician not found.</p>;
  }

  return (
    <div className="top-container mx-4">
      <MusicianComponent musician={musician} works={[]} />
    </div>
  );
}
