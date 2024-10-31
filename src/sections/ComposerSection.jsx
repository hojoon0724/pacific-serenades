import Image from 'next/image';

export default function ComposerSection({ composer }) {
  return (
    <section className="composer-section">
      <h1 className="text-9xl">
        {composer.firstName} {composer.lastName}
      </h1>
      {composer.photo !== '' && (
        <div className="composer-photo">
          <Image src={composer.photo} alt="" width={200} height={200} />
        </div>
      )}
      <div className="composer-dates">{`(${composer.born} - ${composer.died})`}</div>
      <div className="composer-bio" dangerouslySetInnerHTML={composer.bio}></div>
    </section>
  );
}
