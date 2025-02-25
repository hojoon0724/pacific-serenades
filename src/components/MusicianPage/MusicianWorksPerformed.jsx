import MusicianWorkItem from "./MusicianWorkItem";

export default function MusicianWorksPerformedSection({ works }) {
  return (
    <div className="musician-works">
      <h5>Works Performed</h5>
      <div className="musician-works-list-container px-4 py-2">
        {works.map((work) => (
          <MusicianWorkItem work={work} key={work.id} />
        ))}
      </div>
    </div>
  );
}
