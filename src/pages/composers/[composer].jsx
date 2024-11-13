import composersData from '@/data/composersData.json';
import worksData from '@/data/worksData.json';
import Image from 'next/image';
import Link from 'next/link';
import ComposerComponent from '@/components/ComposerComponent';

export async function getStaticPaths() {
  // File name === [composer].jsx
  const paths = Object.keys(composersData).map(composer => {
    return { params: { composer: composer } };
  });
  return {
    paths,
    fallback: false, // This returns 404 if the path doesn’t exist
  };
}

export async function getStaticProps({ params }) {
  const composer = composersData[params.composer];
  const works = Object.values(worksData).filter(work => work.workComposer === params.composer);
  console.log(works);
  return {
    props: {
      composer,
      works,
    },
  };
}

export default function ComposerDetails({ composer, works }) {
  if (!composer) {
    return <p>Composer not found.</p>;
  }

  return (
    <section>
      <ComposerComponent composer={composer} works={works} />
    </section>
  );
}
