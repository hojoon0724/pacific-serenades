import Image from 'next/image';
import Link from 'next/link';

export default function ComposerComponent({ composer, works }) {
  return (
    <>
      <div className="composer-details-container flex flex-row items-center justify-start h-full">
        <div className="composer-photo-container rounded-full border-2 w-36 h-36 overflow-clip">
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
        <div className="composer-name-date-container flex-col pl-4">
          <div className="composer-name text-4xl font-medium">{`${composer.firstName} ${composer.lastName}`}</div>
          <div className="composer-dates-container">{composer.born ? `(${composer.born} - ${composer.died})` : ''}</div>
          {composer.website ? (
            <Link href={composer.website}>
              <button className="composer-website bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Website
              </button>
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="composer-bio-container">
        <div className="composer-bio-text prose" dangerouslySetInnerHTML={{ __html: composer.bio }}></div>
      </div>
      <div className="composer-works">
        <h2>Works</h2>
        {works.map(work => (
          <div className="work-container flex" key={work.id}>
            <div className="work-name">{work.workName}</div>
            <div className="work-year">{work.workYear}</div>
            <div className="work-instrumentation">{work.instrumentation}</div>
          </div>
        ))}
      </div>
    </>
  );
}
