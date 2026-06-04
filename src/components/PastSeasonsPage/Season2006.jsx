import Markdown from "react-markdown";

export function Season2006({ seasonYearData }) {
  return (
    <div className="season-container">
      <div className="season-message">
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
