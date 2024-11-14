import ComposerWorkItem from './ComposerWorkItem';

export default function ComposerWorksPerformedSection({ works }) {
  return (
    <div className="composer-works">
      <h5>Works Performed</h5>
      <div className="composer-works-list-container px-4 py-2">
        {works.map(work => (
          <ComposerWorkItem work={work} key={work.id} />
        ))}
      </div>
    </div>
  );
}
