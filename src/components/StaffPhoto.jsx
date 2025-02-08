import Image from 'next/image';

export default function StaffPhoto({ staff }) {
  return (
    <div className="staff-photo-container">
      <div className="staff-photo">
        <Image src={staff.photo} alt={staff.name} height={750} width={750} />
      </div>
      <div className="staff-photo-name text-center pt-2 pb-6">
        {staff.name}
        <br/>
        <span style={{ fontSize: '80%', fontWeight: '700' }}>{staff.title}</span>
      </div>
    </div>
  );
}
