import StaffBioBlock from "@/components/StaffBioBlock";
import StatementJeff from "@/components/StatementJeff";
import StatementMark from "@/components/StatementMark";
import staffRotatingSecretaryData from "@/data/staff-previous-rotating-secretaries.json";
import staffData from "@/data/staff.json";

export default function About({}) {
  return (
    <div className="top-container flex flex-col justify-center items-center">
      <section className="flex flex-col justify-center items-center">
        <div className="page-title-container mb-8">
          <h1>About</h1>
        </div>
        <div className="section-landing flex flex-col justify-center items-center px-4">
          <div className="message-box-container">
            <div className="message-box-left">
              <StatementJeff />
            </div>
            <div className="message-box-right">
              <StatementMark />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center bg-blue-100 w-full mb-0">
        <div className="page-title-container mb-8 mt-8">
          <h1>Our Team</h1>
        </div>
        <div className="pac-ser-team-container flex flex-col justify-center items-center">
          <div className="staff-bios-container flex flex-col justify-center items-center gap-4 mx-auto h-fit">
            {staffData.map((staff) => (
              <div className="staff-bio-section p-6" key={staff.name}>
                <StaffBioBlock staff={staff} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="top-container flex flex-col justify-center items-center">
        <div className="page-title-container mb-5 mt-5">
          <h2>Previous Rotating Secretaries</h2>
        </div>
        <div className="pac-ser-team-container flex flex-col justify-center items-center">
          <div className="rotating-secretaries-bios-container flex flex-col justify-center items-center gap-4 mx-auto h-fit">
            {staffRotatingSecretaryData.map((staff) => (
              <div className="rotating-secretary-bio-section p-6" key={staff.name}>
                <StaffBioBlock staff={staff} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
