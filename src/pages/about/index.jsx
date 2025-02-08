import StaffPhoto from '@/components/StaffPhoto';
import Landing from '@/sections/MessageFromFounder';

const staff = [
  {
    name: 'Mark Carlson',
    title: 'Honorary Emeritus Chair',
    photo: '/photos/staff_markCarlsonPhoto.jpg',
  },
  {
    name: 'Jeff Kryka',
    title: 'President',
    photo: '/photos/staff_jeffKrykaPhoto.jpg',
  },
  {
    name: 'Victoria Sun',
    title: 'Chief Operating Officer',
    photo: '/photos/staff_victoriaSunPhoto.jpg',
  },
  {
    name: 'Sergey Nesterov',
    title: 'Rotating Secretary',
    photo: '/photos/staff_sergeyNesterovPhoto.jpg',
  },
];
export default function About({}) {
  return (
    <div className="top-container flex flex-col justify-center items-center mx-4 my-8">
      <div className="about-section-container max-w-[800px] flex flex-col justify-center items-center">
        <div className="page-title-container mb-8">
          <h1>About</h1>
        </div>
        <h3>Pacific Serenades Team</h3>
        <div className="staff-photos-container grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {staff.map(staff => (
            <StaffPhoto staff={staff} key={staff.name} />
          ))}
        </div>
      </div>
    </div>
  );
}
