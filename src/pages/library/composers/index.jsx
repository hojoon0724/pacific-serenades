import Image from "next/image";
import Link from "next/link";
import composersData from "@/data/composersData.json";
import ComposerCard from "@/components/ComposerPage/ComposerCard";

const sortedArr = Object.entries(composersData).sort(([, obj1], [, obj2]) =>
  obj1.lastName.localeCompare(obj2.lastName),
);

const composersDataSortedByLastName = Object.fromEntries(sortedArr);

export default function Composers() {
  return (
    <div className="top-container mx-4 flex justify-center items-center">
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
  );
}
