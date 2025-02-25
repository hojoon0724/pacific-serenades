import CommissionCard from "@/components/CommissionCard";
import commissionsData from "@/data/commissionsData.json";

export default function Commissions({}) {
  return (
    <div className="flex flex-col items-center mt-8">
      <h1>Commissions</h1>
      <div className="commissions-container mt-8">
        <div className="commissions-container grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {Object.keys(commissionsData).map((work, index) => {
            return <CommissionCard work={commissionsData[work]} index={index} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
