import HtmlParagraph from "../HtmlParagraph";
import MusicianProfileBlock from "./MusicianProfileBlock";
import MusicianWorksPerformedSection from "./MusicianWorksPerformed";

export default function MusicianComponent({ musician, concerts }) {
  return (
    <section className="top-container flex flex-col py-6">
      <div className="musician-top-container composer-top-container">
        <MusicianProfileBlock musician={musician} />
        {musician.bio !== "" ? (
          <>
            <hr />
            <HtmlParagraph html={musician.bio} className={"musician-bio-container"} />
          </>
        ) : (
          ""
        )}
        <hr />
        <MusicianWorksPerformedSection musicianId={musician.id} concerts={concerts} />
      </div>
    </section>
  );
}
