import Image from "next/image";

export default function StaffBioBlock({ staff }) {
  return (
    <div className="staff-photo-container flex flex-col lg:flex-row justify-center items-center h-fit">
      <div className="staff-photo w-[90%] p-4 lg:w-[30%] lg:p-0 h-full object-cover">
        <Image src={staff.photo} alt={staff.name} height={750} width={750} />
      </div>
      <div className="bio-text-area px-6 h-full">
        <div className="staff-photo-name-title-container text-left pt-2 pb-6">
          <div className="staff-name text-xl">{staff.name}</div>
          <div className="staff-title">{staff.title}</div>
        </div>
        <div className="staff-bio-container prose">
          <p>{staff.bio}</p>
        </div>
      </div>
    </div>
  );
}
