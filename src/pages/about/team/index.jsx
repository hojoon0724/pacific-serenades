import StaffBioBlock from "@/components/StaffBioBlock";

export async function getStaticProps() {
  const staffData = (await import("@/data/staff.json")).default;
  return { props: { staffData } };
}

export default function OurTeam({ staffData }) {
  return (
    <div className="top-container flex flex-col justify-center items-center">
      <div className="w-screen flex flex-col justify-center items-center m-0">
        <div className="page-title-container mb-8 mt-8">
          <h1>Our Team</h1>
        </div>
        <div className="pac-ser-team-container flex flex-col justify-center items-center">
          <div className="staff-bios-container flex flex-col justify-center items-center gap-4 mx-auto h-fit">
            {staffData.map((staff) => (
              <div className="staff-bio-section" key={staff.name}>
                <StaffBioBlock staff={staff} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
