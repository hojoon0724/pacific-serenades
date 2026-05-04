import { Activity, ChevronDown, Flash, Lock, Scale, Server, TagUser } from "@/components/Icons";
import PacSerWideLockup from "@/components/PacSerWideLockup";

function PreviewSection({ title, note, children }) {
  return (
    <section className="border border-gray-200 rounded-lg p-6 my-6">
      <h2 className="text-xl font-bold mb-1">{title}</h2>
      {note && <p className="text-sm text-gray-400 italic mb-4">{note}</p>}
      <div>{children}</div>
    </section>
  );
}

export default function ComponentsPreview() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <PreviewSection title="Icons" note="Named exports: ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale">
        <div className="flex gap-6 flex-wrap items-center">
          <div className="flex flex-col items-center gap-1">
            <ChevronDown fill="currentColor" size={32} />
            <span className="text-xs text-gray-400">ChevronDown</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Lock fill="currentColor" size={32} />
            <span className="text-xs text-gray-400">Lock</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Activity fill="currentColor" size={32} />
            <span className="text-xs text-gray-400">Activity</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Flash fill="currentColor" size={32} />
            <span className="text-xs text-gray-400">Flash</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Server fill="currentColor" size={32} />
            <span className="text-xs text-gray-400">Server</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <TagUser fill="currentColor" size={32} />
            <span className="text-xs text-gray-400">TagUser</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Scale fill="currentColor" size={32} />
            <span className="text-xs text-gray-400">Scale</span>
          </div>
        </div>
      </PreviewSection>

      <PreviewSection title="PacSerWideLockup" note="Props: { fillColor } — wide SVG logo lockup">
        <div className="w-full max-w-xl">
          <PacSerWideLockup fillColor="currentColor" />
        </div>
      </PreviewSection>

    </div>
  );
}
