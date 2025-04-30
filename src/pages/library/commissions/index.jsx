import CommissionCard from "@/components/CommissionCard";
import commissionsData from "@/data/commissionsData.json";
import worksData from "@/data/worksData.json";
import { useState } from "react";

const commissionsWithWorkId = commissionsData.map((commission) => {
  const matchingWork = Object.keys(worksData).find(
    (workId) =>
      commission.composerId === worksData[workId].workComposer && commission.workName === worksData[workId].workName
  );

  return matchingWork
    ? { ...commission, workId: worksData[matchingWork].id, workYear: worksData[matchingWork].workYear }
    : commission;
});

const commissionsSortedByYear = commissionsWithWorkId.sort((a, b) => b.workYear - a.workYear);

export default function Commissions({}) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter commissions based on search term
  const filteredCommissions = commissionsSortedByYear.filter((commission) => {
    const searchString = `${commission.workComposer} ${commission.workName} ${commission.commissionedBy}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

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
            filteredCommissions.map((work, index) => {
              return <CommissionCard work={work} index={index} key={index} />;
            })
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
