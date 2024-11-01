import Image from 'next/image';

export default function ComposerComponent({ composer }) {
  return (
    <div className="composer-top-container">
      <div className="composer-info-container">
        <div className="composer-photo">
          {composer.photo !== '' && <Image src={composer.photo} alt="" width={200} height={200} />}
        </div>
        <div className="composer-name capitalize">
          {composer.firstName} {composer.lastName}
        </div>
        <div className="composer-years">{composer.born !== '' && `(${composer.born} - ${composer.died})`}</div>
      </div>
      <div className="composer-bio-container">
        <div dangerouslySetInnerHTML={{ __html: composer.bio }}></div>
      </div>
    </div>
  );
}
