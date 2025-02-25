import Image from "next/image";
import Link from "next/link";

export default function ComposerProfileBlock({ musician }) {
  return (
    <div className="musician-details-container flex flex-row items-center justify-start h-full py-4">
      <div className="musician-photo-container rounded-full border-2 w-36 h-36 overflow-clip">
        {musician.photo === "" ? (
          <Image src="/icons/person.svg" alt="person icon" width={200} height={200} />
        ) : (
          <Image src={musician.photo} alt="" width={200} height={200} className="w-full h-full object-cover border-0" />
        )}
      </div>
      <div className="musician-name-date-container flex-col pl-4">
        <h3 className="musician-name">{`${musician.firstName} ${musician.lastName}`}</h3>
        {/* <h1 className="musician-name text-4xl font-medium">{`${musician.firstName} ${musician.lastName}`}</h1> */}
        <div className="musician-dates-container">{musician.born ? `(${musician.born} - ${musician.died})` : ""}</div>
        {musician.website ? (
          <Link href={musician.website}>
            <button className="musician-website bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition-all">
              Website
            </button>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
