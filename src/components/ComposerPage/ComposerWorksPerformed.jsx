import ComposerWorkItem from "./ComposerWorkItem";

export default function ComposerWorksPerformedSection({ works }) {
  if (!works || works.length === 0) {
    return null;
  }

  return (
    <div className="composer-works">
      <h5 className="text-xl font-semibold mb-4">Works Performed</h5>
      <div className="composer-works-list-container">
        <ul className="grid gap-5">
          {works.map((work) => (
            <li
              key={work.id}
              className="work-item bg-white rounded-lg shadow-sm border-l-4 border-teal-600 hover:shadow-md transition-all"
            >
              <div className="work-header pl-4 pr-5 pt-4 pb-1 flex gap-2 items-center">
                <h3 className="text-xl font-bold tracking-tight text-teal-800">{work.workName}</h3>
                <div className="work-year text-sm text-gray-500">
                  {work.workYear === "0" ? "" : `(${work.workYear})`}
                </div>
              </div>
              <div className="px-5 pb-5">
                <ComposerWorkItem work={work} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
