import StaffPhoto from "@/components/StaffBioBlock";
import Landing from "@/sections/MessageFromFounder";
import StatementJeff from "@/components/StatementJeff";
import StatementMark from "@/components/StatementMark";
import StaffBioBlock from "@/components/StaffBioBlock";

const staff = [
  {
    name: "Mark Carlson",
    title: "Honorary Emeritus Chair",
    photo: "/photos/staff_markCarlsonPhoto.jpg",
    bio: "Composer Mark Carlson’s lyrical and distinctive music has captivated audiences across North America and Europe. With around 100 works spanning chamber, choral, and orchestral music, he also founded and directed the chamber music series Pacific Serenades. A former UCLA professor, he taught for 28 years and remains active as a private teacher. Now retired from performing, he was also a dedicated flutist.",
    website: "https://www.markcarlsonmusic.com/",
  },
  {
    name: "Jeff Kryka",
    title: "President",
    photo: "/photos/staff_jeffKrykaPhoto.jpg",
    bio: "Los Angeles-based composer, orchestrator, and conductor Jeff Kryka has worked on major films, TV series, and video games. Awarded by ASCAP, TCM, and the Henry Mancini Foundation, his credits include The Imagineering Story, Superpowered: The DC Story, and orchestrations for Inside Out 2, The Batman, Marvel’s Spider-Man trilogy, the Jurassic World trilogy, Rogue One, among many more. He holds degrees from UCLA and the University of Wisconsin-Madison and has taught at UCLA and the Colburn Conservatory.",
    website: "https://www.jeffkryka.com/",
  },
  {
    name: "Victoria Sun",
    title: "Chief Operating Officer",
    photo: "/photos/staff_victoriaSunPhoto.jpg",
    bio: "Chinese American pianist Victoria Sun made her concerto debut at age nine with the Qingdao Opera Symphony Orchestra. She has since performed with orchestras including the Orchestra Collective of Orange County and the San Francisco International Music Symphony, and recitals at Carnegie’s Weill Recital Hall, Colburn’s Zipper Hall, and Acqui Terme in Italy. She is a top prizewinner in competitions such as CAPMT OC, GOCAA San Francisco, and the Los Angeles International Liszt Competition. Victoria currently studies with Dr. Myong-Joo Lee.",
    website: "",
  },
  {
    name: "Sergey Nesterov",
    title: "Rotating Secretary",
    photo: "/photos/staff_sergeyNesterovPhoto.jpg",
    bio: "Composer, orchestrator, and songwriter Sergey Nesterov (Sergey Neiss) is recognized in concert and media music. He is a graduate of the Moscow Tchaikovsky Conservatory and is a Boris Tchaikovsky Fund prize winner. Now studying composition at UCLA, he has collaborated with top ensembles and artists with performances at Carnegie Hall, Zaryadye Hall, and the Damascus Opera House.",
    website: "",
  },
];
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
      <div className="w-screen flex flex-col justify-center items-center m-0 bg-green-100">
        <div className="pac-ser-team-container flex flex-col justify-center items-center">
          <h2 className="py-8">Pacific Serenades Team</h2>
          <div className="staff-bios-container flex flex-col justify-center items-center gap-4 mx-auto h-fit">
            {staff.map((staff) => (
              <div className="staff-bio-section p-6" key={staff.name}>
                <StaffBioBlock staff={staff} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
