import Image from 'next/image';
import Link from 'next/link';
import musiciansData from '@/data/musiciansData.json';

export default function Musicians() {
  return (
    <section className="flex flex-wrap mx-auto items-center w-fit justify-center">
      {Object.keys(musiciansData).map(key => {
        const composer = musiciansData[key];
        return (
          <Link href={`/musicians/${key}`} key={key}>
            <div className="composer-container flex justify-start items-center p-4 w-[300px]" key={key}>
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
            </div>
          </Link>
        );
      })}
    </section>
  );
}
