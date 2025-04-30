export default function ComposerWorkItem({ work }) {
  return (
    <div className="work-container flex flex-col">
      <div className="work-name-year flex flex-row items-baseline"></div>
      <div className="work-instrumentation pl-2 pb-4">{work.instrumentation}</div>
      {work.commissionedBy ? (
        <div className="work-commissioned-by pl-2 text-sm italic">{work.commissionedBy}</div>
      ) : (
        ""
      )}
    </div>
  );
}
