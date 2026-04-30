import ComposerComponent from "@/components/ComposerPage/ComposerComponent";
import composersData from "@/data/serving/composersData.json";
import worksData from "@/data/serving/worksData.json";

export async function getStaticPaths() {
  // File name === [composer].jsx
  const paths = Object.keys(composersData).map((composer) => {
    return { params: { composer: composer } };
  });
  return {
    paths,
    fallback: false, // This returns 404 if the path doesn’t exist
  };
}

export async function getStaticProps({ params }) {
  const composer = composersData[params.composer];

  const works = Object.values(worksData).filter((work) => work.workComposer === params.composer);
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
    <div className="top-container mx-4">
      <ComposerComponent composer={composer} works={works} />
    </div>
  );
}
