export default function CommissionCard({ work, index }) {
  return (
    <div
      className="work-container m-4 h-[200px] flex flex-col justify-between border-3 border-cyan-500 px-4 py-3 rounded-2xl"
      key={index}
    >
      <div className="card-top">
        <div className="work-title text-2xl">{work.workName}</div>
        <div className="work-composer text-lg font-bold">{work.workComposer}</div>
      </div>
      <div className="work-commissioned">{work.commissionedBy}</div>
    </div>
  );
}
