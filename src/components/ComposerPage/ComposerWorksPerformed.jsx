import ComposerWorkItem from './ComposerWorkItem';

export default function ComposerWorksPerformedSection({ works }) {
  return (
    <div className="composer-works">
      <h2 className="text-2xl font-bold">Works Performed</h2>
      <div className="composer-works-list-container px-4 py-2">
        {works.map(work => (
          <ComposerWorkItem work={work} key={work.id} />
        ))}
      </div>
    </div>
  );
}
