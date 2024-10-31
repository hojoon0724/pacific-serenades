import Image from 'next/image';

export default function ComposerSection({ composer }) {
  return (
    <div className="composer-section flex capitalize text-5xl">
      <div className="capitalize bg-purple-500">this ith</div>
      <h1 className="text-9xl capitalize">
        {composer.firstName} {composer.lastName}
      </h1>
      {composer.photo !== '' && (
        <div className="composer-photo">
          <Image src={composer.photo} alt="" width={200} height={200} />
        </div>
      )}
      <div className="composer-dates">{`(${composer.born} - ${composer.died})`}</div>
      <div className="composer-bio" dangerouslySetInnerHTML={{ __html: composer.bio }}></div>
    </div>
  );
}
