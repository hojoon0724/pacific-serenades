import ComposerCard from "@/components/ComposerPage/ComposerCard";
import Image from "next/image";
import Link from "next/link";

export async function getStaticProps() {
  const composersData = (await import("@/data/serving/composersData.json")).default;
  const musiciansData = (await import("@/data/serving/musiciansData.json")).default;

  const composers = Object.entries(composersData)
    .filter(([, c]) => c.show !== false)
    .sort(([, a], [, b]) => a.lastName.localeCompare(b.lastName))
    .map(([id, c]) => ({ id, fullName: c.fullName, lastName: c.lastName, photo: c.photo }));

  const musicians = Object.entries(musiciansData)
    .sort(([, a], [, b]) => a.lastName.localeCompare(b.lastName))
    .map(([id, m]) => ({ id, firstName: m.firstName, lastName: m.lastName, photo: m.photo }));

  return { props: { composers, musicians } };
}

export default function ComposersMusicians({ composers, musicians }) {
  return (
    <div className="top-container flex flex-col gap-8">
      <div className="flex flex-col justify-center items-center">
        <h1 className="my-8">Composers</h1>
        <div className="prose mb-8 m-2">
          <p className="text-center">
            The music of Pacific Serenades is a blend of past and present and its continued creation is essential to our
            mission. The following composers have contributed to this legacy through their works featured in our
            programs.
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
      <div className="flex flex-col items-center bg-blue-100">
        <h1 className="my-8">Musicians</h1>
        <div className="prose mb-8 m-2">
          <p className="text-center">
            Performers are the heart of Pacific Serenades. We are grateful to the talented musicians who have shared
            their artistry with us over the years. Here are some of the incredible musicians who have been part of our
            journey.
          </p>
        </div>
        <section className="flex flex-wrap mx-auto items-center w-fit justify-center">
          {musicians.map((musician, i) => (
            <Link href={`/library/musicians/${musician.id}`} key={musician.id}>
              <div className="musician-container flex justify-start items-center p-4 w-[90svw] xs:w-[260px]">
                <div className="musician-photo w-12 min-w-12 h-12 min-h-12 rounded-full overflow-clip">
                  {musician.photo === "" ? (
                    <Image src="/icons/person.svg" alt="person icon" width={48} height={48} />
                  ) : (
                    <Image
                      src={musician.photo}
                      alt={`${musician.firstName} ${musician.lastName}`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover border-0"
                      priority={i < 10}
                    />
                  )}
                </div>
                <div className="musician-name pl-4">
                  {musician.firstName} {musician.lastName}
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
