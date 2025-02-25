import StaffPhoto from "@/components/StaffBioBlock";
import StatementJeff from "@/components/StatementJeff";
import StatementMark from "@/components/StatementMark";
import StaffBioBlock from "@/components/StaffBioBlock";
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
    </div>
  );
}
