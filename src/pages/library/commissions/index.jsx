import CommissionCard from "@/components/CommissionCard";
import { useMemo, useState } from "react";

export async function getStaticProps() {
  const commissionsData = (await import("@/data/commissionsData.json")).default;
  const worksData = (await import("@/data/serving/worksData.json")).default;

  const enriched = commissionsData
    .map((commission) => {
      const matchId = Object.keys(worksData).find(
        (id) => commission.composerId === worksData[id].workComposer && commission.workName === worksData[id].workName,
      );
      if (!matchId) return null;
      const work = worksData[matchId];
      return {
        workComposer: commission.workComposer,
        workName: commission.workName,
        commissionedBy: commission.commissionedBy ?? null,
        composerId: commission.composerId,
        workId: work.id ?? null,
        workYear: work.workYear ?? null,
        instrumentation: work.instrumentation ?? null,
        links: work.links ?? null,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.workYear - a.workYear);

  return { props: { commissions: enriched } };
}

export default function Commissions({ commissions }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCommissions = useMemo(() => {
    if (!searchTerm) return commissions;
    const lower = searchTerm.toLowerCase();
    return commissions.filter((c) =>
      `${c.workComposer} ${c.workName} ${c.commissionedBy}`.toLowerCase().includes(lower),
    );
  }, [commissions, searchTerm]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-8">Commissions</h1>
      <div className="prose mb-4 m-2">
        <p className="text-center">
          The following musical compositions were commissioned and premiered by Pacific Serenades. They are available
          for rental and purchase through Subito Music.
        </p>
      </div>

      {/* Search input */}
      <div className="w-full max-w-md mb-8">
        <input
          type="text"
          placeholder="Search by composer, title, or commissioner..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="commissions-container">
        <div className="commissions-container grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {filteredCommissions.length > 0 ? (
            filteredCommissions.map((work) => (
              <CommissionCard work={work} key={`${work.composerId}-${work.workName}`} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p>No commissions found matching {searchTerm && `"${searchTerm}"`}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
