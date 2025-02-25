import Image from "next/image";
import Link from "next/link";
import composersData from "@/data/composersData.json";
import ComposerCard from "@/components/ComposerPage/ComposerCard";

console.log(composersData);
export default function Composers() {
  return (
    <div className="top-container mx-4 flex justify-center items-center">
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 items-center w-fit justify-center">
        {Object.keys(composersData).map((key) => {
          if (composersData[key].show === false) {
            return null;
          } else {
            const composer = composersData[key];
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
