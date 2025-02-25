import Image from "next/image";
import Link from "next/link";

export default function StaffBioBlock({ staff }) {
  return (
    <div className="staff-photo-container flex flex-col lg:flex-row justify-center items-center h-fit">
      <div className="staff-photo w-[100%] p-0 lg:w-[30%] lg:p-0 h-full object-cover">
        <Image src={staff.photo} alt={staff.name} height={750} width={750} />
      </div>
      <div className="bio-text-area px-0 sm:px-6 h-full">
        <div className="staff-photo-name-title-container text-left pt-2 pb-6">
          <div className="staff-name text-xl">{staff.name}</div>
          <div className="staff-title">{staff.title}</div>
        </div>
        <div className="staff-bio-container prose text-left">
          <p>{staff.bio}</p>
        </div>
        {staff.website ? (
          <div className="staff-website-link-container">
            <Link href={staff.website}>{staff.website}</Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
