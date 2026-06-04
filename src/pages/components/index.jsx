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
      <PreviewSection title="gradients" className="flex flex-col gap-4">
        <div className="gradients-container flex flex-col gap-4">
          <div className="swatch-container w-80 h-24 border border-gray-300 flex flex-col gap-2">
            <div className="gradient-assembly w-full h-8 bg-gradient-to-r from-[#006571] to-[#007e80]"></div>
            <div className="swatches flex w-full">
              <div className="h-8 w-full" style={{ backgroundColor: "#006571" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#007e80" }}></div>
            </div>
          </div>
          <div className="swatch-container w-80 h-24 border border-gray-300 flex flex-col gap-2">
            <div className="gradient-assembly w-full h-8 bg-gradient-to-r from-[#a2bfa4] via-[#ffffff] to-[#d9ae9d]"></div>
            <div className="swatches flex w-full">
              <div className="h-8 w-full" style={{ backgroundColor: "#a2bfa4" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#a6c3a6" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#b4cfaf" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#c6dfba" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#ffffff" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#faf6f4" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#f0e0d8" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#e9d2c6" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#d9ae9d" }}></div>
            </div>
          </div>
          <div className="swatch-container w-80 h-24 border border-gray-300 flex flex-col gap-2">
            <div className="gradient-assembly w-full h-8 bg-gradient-to-r from-[#d6923f] to-[#fdde48]"></div>
            <div className="swatches flex w-full">
              <div className="h-8 w-full" style={{ backgroundColor: "#d6923f" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#e7b343" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#f7d246" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#fdde48" }}></div>
            </div>
          </div>
          <div className="swatch-container w-80 h-24 border border-gray-300 flex flex-col gap-2">
            <div className="gradient-assembly w-full h-8 bg-gradient-to-r from-[#8cb292] via-[#ffffff] to-[#e9984d]"></div>
            <div className="swatches flex w-full">
              <div className="h-8 w-full" style={{ backgroundColor: "#8cb292" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#8cb292" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#90b595" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#9ec09e" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#b5d2ae" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#c6dfba" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#ffffff" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#fefdfb" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#fefaef" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#fdf4dc" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#fcecc1" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#fbe29f" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#fbe29c" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#e9984d" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#e9984d" }}></div>
            </div>
          </div>
          <div className="swatch-container w-80 h-24 border border-gray-300 flex flex-col gap-2">
            <div className="gradient-assembly w-full h-8 bg-gradient-to-r from-[#a4c0a7] via-[#bad1bd] to-[#a4c0a7]"></div>
            <div className="swatches flex w-full">
              <div className="h-8 w-full" style={{ backgroundColor: "#a4c0a7" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#bad1bd" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#bad1bd" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#aec5af" }}></div>
            </div>
          </div>
          <div className="swatch-container w-80 h-24 border border-gray-300 flex flex-col gap-2">
            <div className="gradient-assembly w-full h-8 bg-gradient-to-r from-[#cedbce] via-[#81bc66] to-[#d7de50]"></div>
            <div className="swatches flex w-full">
              <div className="h-8 w-full" style={{ backgroundColor: "#cedbce" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#81bc66" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#d7de50" }}></div>
            </div>
          </div>
          <div className="swatch-container w-80 h-24 border border-gray-300 flex flex-col gap-2">
            <div className="gradient-assembly w-full h-8 bg-gradient-to-r from-[#a1d3d8] to-[#649ead]"></div>
            <div className="swatches flex w-full">
              <div className="h-8 w-full" style={{ backgroundColor: "#a1d3d8" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#a1d3d8" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#649ead" }}></div>
            </div>
          </div>
          <div className="swatch-container w-80 h-24 border border-gray-300 flex flex-col gap-2">
            <div className="gradient-assembly w-full h-8 bg-gradient-to-r from-[#56308b] to-[#204c9b]"></div>
            <div className="swatches flex w-full">
              <div className="h-8 w-full" style={{ backgroundColor: "#56308b" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#204c9b" }}></div>
            </div>
          </div>
          <div className="swatch-container w-80 h-24 border border-gray-300 flex flex-col gap-2">
            <div className="gradient-assembly w-full h-8 bg-gradient-to-r from-[#7ca390] via-[#d2ddd1] to-[#7ca390]"></div>
            <div className="swatches flex w-full">
              <div className="h-8 w-full" style={{ backgroundColor: "#7ca390" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#d2ddd1" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#a6bfb0" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#87aa98" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#7ca390" }}></div>
            </div>
          </div>
          <div className="swatch-container w-80 h-24 border border-gray-300 flex flex-col gap-2">
            <div className="gradient-assembly w-full h-8 bg-gradient-to-r from-[#9d312e] to-[#792826]"></div>
            <div className="swatches flex w-full">
              <div className="h-8 w-full" style={{ backgroundColor: "#9d312e" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#792826" }}></div>
            </div>
          </div>
          <div className="swatch-container w-80 h-24 border border-gray-300 flex flex-col gap-2">
            <div className="gradient-assembly w-full h-8 bg-gradient-to-r from-[#f1d950] to-[#e8c648]"></div>
            <div className="swatches flex w-full">
              <div className="h-8 w-full" style={{ backgroundColor: "#f1d950" }}></div>
              <div className="h-8 w-full" style={{ backgroundColor: "#e8c648" }}></div>
            </div>
          </div>
        </div>
      </PreviewSection>

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
