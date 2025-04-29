import commissionsData from "@/data/commissionsData.json";
import worksData from "@/data/worksData.json";
import { useMemo } from "react";

export default function CommissionCard({ work, index }) {
  // Find matching commission
  const commission = useMemo(() => {
    return commissionsData.find((c) => c.workName === work.workName && c.workComposer === work.workComposer);
  }, [work]);

  // Skip rendering if not a commission
  if (!commission) return null;

  return (
    <div
      className="work-container m-4 flex flex-col justify-between rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] bg-white"
      key={index}
    >
      <div className="top-half">
      {/* Composer section with light blue background */}
      <div className="composer-section bg-blue-50/70 p-4 border-l-4 border-blue-500">
        <h3 className="work-composer text-lg font-semibold text-blue-800">{work.workComposer}</h3>
      </div>

      {/* Work details with white background */}
      <div className="work-details p-4">
        <h2 className="work-title text-2xl font-bold text-gray-800">
          {work.workName} <span className="text-gray-600">({worksData[work.workId].workYear})</span>
        </h2>
        {worksData[work.workId].instrumentation && (
          <div className="work-instrumentation text-gray-700 mb-3 text-sm">
            {worksData[work.workId].instrumentation}
          </div>
        )}

        {commission.commissionedBy && (
          <div className="work-commissioned text-gray-600 italic mb-8 text-sm">{commission.commissionedBy}</div>
        )}

      </div>
      </div>

      {/* Links section with light gray background if links exist */}
      <div className="links-section bg-gray-50 p-4 border-t border-gray-200 min-h-[70px] flex flex-col justify-center">
        {worksData[work.workId].links && worksData[work.workId].links.length > 0 && (
          <div className="purchase-links flex gap-2 flex-wrap">
            {worksData[work.workId].links.map((link, idx) => (
              <a href={link.url} target="_blank" rel="noopener noreferrer" key={idx} className="inline-block">
                <div className="work-link px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium flex items-center">
                  {link.variant === "" ? (
                    <>{link.label}</>
                  ) : (
                    <div className="flex flex-row gap-1 items-center">
                      <span>{link.label}</span>
                      <span className="text-xs bg-blue-700/50 px-1.5 py-0.5 rounded-md whitespace-nowrap">
                        {link.variant}
                      </span>
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
