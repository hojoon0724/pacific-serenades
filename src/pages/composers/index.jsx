import Image from 'next/image';
import Link from 'next/link';
import composersData from '@/data/composersData.json';
import ComposerCard from '@/components/ComposerPage/ComposerCard';

export default function Composers() {
  return (
    <section className="grid grid-cols-5 gap-6 items-center w-fit justify-center">
      {Object.keys(composersData).map(key => {
        const composer = composersData[key];
        return (
          <Link href={`/composers/${key}`} key={key}>
            <ComposerCard composer={composer} />
            {/* <div className="composer-container flex justify-start items-center p-4 w-[300px]" key={key}>
              <div className="composer-photo w-12 min-w-12 h-12 min-h-12 rounded-full overflow-clip">
                {composer.photo === '' ? (
                  <Image src="/icons/person.svg" alt="person icon" width={200} height={200} />
                ) : (
                  <Image
                    src={composer.photo}
                    alt=""
                    width={200}
                    height={200}
                    className="w-full h-full object-cover border-0"
                  />
                )}
              </div>
              <div className="composer-name pl-4" key={key}>
                {composer.firstName} {composer.lastName}
              </div>
            </div> */}
          </Link>
        );
      })}
    </section>
  );
}
