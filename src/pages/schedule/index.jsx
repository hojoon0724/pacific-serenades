
import CurrentSeason from "@/components/CurrentSeasonBlock";
import PastSeasons from "../../components/PastSeasons";

export default function Schedule() {
  return (
    <div className="top-container flex flex-col items-center justify-center">
      <CurrentSeason />
      <PastSeasons bgColor={"bg-blue-100"} />
    </div>
  );
}
