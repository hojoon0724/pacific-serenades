import allComposers from '@/data/allComposers.json';
import Image from 'next/image';
import Link from 'next/link';
import { camelToKebab } from '../../utils/notInUse/camelToKebab';
import ComposerComponent from '@/components/ComposerComponent';

export async function getStaticPaths() {
  // File name === [composer].jsx
  const paths = Object.keys(allComposers).map(composer => {
    return { params: { composer: composer } };
  });
  return {
    paths,
    fallback: false, // This returns 404 if the path doesn’t exist
  };
}

export async function getStaticProps({ params }) {
  const composer = allComposers[params.composer];
  return {
    props: {
      composer,
    },
  };
}

export default function ComposerDetails({ composer }) {
  if (!composer) {
    return <p>Composer not found.</p>;
  }

  return (
    <section>
      <ComposerComponent composer={composer} />
    </section>
  );
}
