import Markdown from "react-markdown";
import MusicianProfileBlock from "./MusicianProfileBlock";
import MusicianWorksPerformedSection from "./MusicianWorksPerformed";

export default function MusicianComponent({ musician, concerts }) {
  return (
    <section className="top-container flex flex-col py-6">
      <div className="musician-top-container composer-top-container">
        <MusicianProfileBlock musician={musician} />
        <hr />
        {musician.bio && (
          <div className="musician-bio max-w-prose text-justify">
            <Markdown>{musician.bio}</Markdown>
            <hr />
          </div>
        )}
        <MusicianWorksPerformedSection musicianId={musician.id} concerts={concerts} />
      </div>
    </section>
  );
}
