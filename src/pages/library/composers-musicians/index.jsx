import Image from "next/image";
import Link from "next/link";
import composersData from "@/data/composersData.json";
import ComposerCard from "@/components/ComposerPage/ComposerCard";
import musiciansData from "@/data/musiciansData.json";

const sortedArrComposers = Object.entries(composersData).sort(([, obj1], [, obj2]) =>
  obj1.lastName.localeCompare(obj2.lastName),
);
const composersDataSortedByLastName = Object.fromEntries(sortedArrComposers);

const sortedArrMusicians = Object.entries(musiciansData).sort(([, obj1], [, obj2]) =>
  obj1.lastName.localeCompare(obj2.lastName),
);
const musiciansDataSortedByLastName = Object.fromEntries(sortedArrMusicians);

export default function Musicians() {
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
          {Object.keys(composersDataSortedByLastName).map((key) => {
            if (composersDataSortedByLastName[key].show === false) {
              return null;
            } else {
              const composer = composersDataSortedByLastName[key];
              return (
                <Link href={`/library/composers/${key}`} key={key}>
                  <ComposerCard composer={composer} />
                </Link>
              );
            }
          })}
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
          {Object.keys(musiciansDataSortedByLastName).map((key) => {
            const musician = musiciansDataSortedByLastName[key];
            return (
              <Link href={`/library/musicians/${key}`} key={key}>
                <div
                  className="musician-container flex justify-start items-center p-4 w-[90svw] xs:w-[260px]"
                  key={key}
                >
                  <div className="musician-photo w-12 min-w-12 h-12 min-h-12 rounded-full overflow-clip">
                    {musician.photo === "" ? (
                      <Image src="/icons/person.svg" alt="person icon" width={200} height={200} />
                    ) : (
                      <Image
                        src={musician.photo}
                        alt=""
                        width={200}
                        height={200}
                        className="w-full h-full object-cover border-0"
                      />
                    )}
                  </div>
                  <div className="musician-name pl-4" key={key}>
                    {musician.firstName} {musician.lastName}
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </div>
  );
}
