import Image from 'next/image';
import allComposers from '@/data/allComposers.json';

export default function Composers() {
  console.log(allComposers);
  return (
    <section className="grid grid-cols-4">
      {Object.keys(allComposers).map(key => {
        const composer = allComposers[key];
        console.log(composer);
        return (
          <div className="composer-container flex justify-center items-center p-3 w-96" key={key}>
            <div className="composer-photo w-12 h-12 ">
              <Image
                src={composer.photo}
                alt=""
                width={200}
                height={200}
                objectFit="cover"
                className="w-full h-full object-cover border-0"
              />
            </div>
            <div className="composer capitalize" key={key}>
              {composer.firstName} {composer.lastName}
            </div>
          </div>
        );
      })}
    </section>
  );
}
