import CommissionCard from "@/components/CommissionCard";
import commissionsData from "@/data/commissionsData.json";

export default function Commissions({}) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-8">Commissions</h1>
      <div className="prose mb-8 m-2">
        <p className="text-center">
          The following musical compositions were commissioned and premiered by Pacific Serenades. They are available
          for rental and purchase through Subito Music.
        </p>
      </div>
      <div className="commissions-container">
        <div className="commissions-container grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {Object.keys(commissionsData).map((work, index) => {
            return <CommissionCard work={commissionsData[work]} index={index} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
