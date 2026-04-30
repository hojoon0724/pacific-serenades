import ComposerCard from "@/components/ComposerPage/ComposerCard";
import Link from "next/link";

export async function getStaticProps() {
  const composersData = (await import("@/data/serving/composersData.json")).default;

  const composers = Object.entries(composersData)
    .filter(([, c]) => c.show !== false)
    .sort(([, a], [, b]) => a.lastName.localeCompare(b.lastName))
    .map(([id, c]) => ({ id, fullName: c.fullName, lastName: c.lastName, photo: c.photo }));

  return { props: { composers } };
}

export default function Composers({ composers }) {
  return (
    <div className="top-container mx-4 flex flex-col justify-center items-center">
      <h1 className="my-8">Composers</h1>
      <div className="prose mb-8 m-2">
        <p className="text-center">
          The music of Pacific Serenades is a blend of past and present and its continued creation is essential to our
          mission. The following composers have contributed to this legacy through their works featured in our programs.
        </p>
      </div>
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 items-center w-fit justify-center">
        {composers.map((composer, i) => (
          <Link href={`/library/composers/${composer.id}`} key={composer.id}>
            <ComposerCard composer={composer} priority={i < 12} />
          </Link>
        ))}
      </section>
    </div>
  );
}
