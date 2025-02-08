import CommissionCard from '@/components/CommissionCard';
import commissionsData from '@/data/commissionsData.json';

export default function Commissions({}) {
  return (
    <div className="commissions-container">
      <div className="commissions-container grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {commissionsData.map((work, index) => {
          return <CommissionCard work={work} index={index} key={index} />;
        })}
      </div>
    </div>
  );
}
