import CapitalizeTitle from '../CapitalizeTitle';

export default function ComposerWorkItem({ work }) {
  return (
    <div className="work-container flex flex-col py-2">
      <div className="work-name-year flex flex-row items-baseline">
        <div className="work-name text-lg pr-2">
          <CapitalizeTitle str={work.workName} />
        </div>
        {/* <div className="work-year">{work.workYear}</div> */}
        <div className="work-year">{work.workYear === '0' ? '' : `(${work.workYear})`}</div>
      </div>
      <div className="work-instrumentation pl-2">{work.instrumentation}</div>
      {work.commissionedBy ? (
        <div className="work-commissioned-by pl-2 text-sm font-bold">{work.commissionedBy}</div>
      ) : (
        ''
      )}
    </div>
  );
}
