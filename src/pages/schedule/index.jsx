import SeasonBlock from "@/components/SeasonBlock";
import seasonData from "@/data/seasonConcertsList.json";
import concertsData from "@/data/concertsData.json";
import worksData from "@/data/worksData.json";
import composersData from "@/data/composersData.json";
import CapitalizeTitle from "@/components/CapitalizeTitle";
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
