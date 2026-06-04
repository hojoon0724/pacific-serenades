import Markdown from "react-markdown";
import Image from "next/image";

export function Season2005({ seasonYearData }) {
  return (
    <div className="season-container relative w-full h-full flex flex-1">
      <div className="season-bg-container absolute inset-0 flex flex-col items-center justify-start">
        <Image src={`/graphics/seasons/2005/2005-bg.svg`} alt={`Season ${seasonYearData?.year} Background`} layout="fill" objectFit="contain" />
      </div>
      <div className="season-bg-container flex w-full h-full absolute inset-0 justify-end">
        <div className="element-1 w-[35%] relative">

        <Image src={`/graphics/seasons/2005/2005-element-1.png`} alt={`Season ${seasonYearData?.year} Background`} layout="fill" objectFit="contain" />
        </div>
      </div>
      <div className="season-message z-10 relative h-full">
        {seasonYearData?.seasonIntroMd && (
          <div className="intro-text-container max-w-prose text-left">
            <Markdown>{seasonYearData.seasonIntroMd.text}</Markdown>
            {seasonYearData.seasonIntroMd.author && (
              <div className="author text-right">–{seasonYearData.seasonIntroMd.author}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
