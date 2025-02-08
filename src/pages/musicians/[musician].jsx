import musiciansData from '@/data/musiciansData.json';
import worksData from '@/data/worksData.json';
import Image from 'next/image';
import Link from 'next/link';
import ComposerComponent from '@/components/ComposerPage/ComposerComponent';

export async function getStaticPaths() {
  // File name === [composer].jsx
  const paths = Object.keys(musiciansData).map(musician => {
    return { params: { musician: musician } };
  });
  return {
    paths,
    fallback: false, // This returns 404 if the path doesn’t exist
  };
}

export async function getStaticProps({ params }) {
  const musician = musiciansData[params.musician];
  // const works = Object.values(worksData).filter(work => work.workComposer === params.composer);
  // console.log(works);
  return {
    props: {
      musician,
      // works,
    },
  };
}

export default function ComposerDetails({ musician }) {
  if (!musician) {
    return <p>Composer not found.</p>;
  }

  return (
    <div className="top-container mx-4">
      <ComposerComponent composer={musician} works={[]} />
    </div>
  );
}
