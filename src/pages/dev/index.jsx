import seasons from "@/data/seasons.json";
import Markdown from "react-markdown";

const CIRCLE_SIZE = 360;
const CIRCLE_CENTER = CIRCLE_SIZE / 2;
const CIRCLE_RADIUS = 138;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

function buildCircularText(text) {
  return `${text.trim().replace(/\s+/g, " ")}\u00A0`;
}

function getCircularFontSize(text) {
  return Math.max(9, Math.min(15, CIRCLE_CIRCUMFERENCE / (text.length * 0.88)));
}

export default function Dev() {
  const seasonsData = seasons;
  return (
    <div className="dev w-fit mx-auto">
      {Object.keys(seasonsData).map((season, index) => {
        const seasonYear = season;
        const introText = seasonsData[season].seasonIntroMd;
        const circularTextId = `circular-text-${seasonYear}`;
        const circularText = introText?.circularText ? buildCircularText(introText.circularText) : "";
        const circularFontSize = getCircularFontSize(circularText);
        return introText ? (
          <div key={index} className="intro-text-container mt-12">
            <h1>{seasonYear}</h1>
            <div className="intro-text-container prose">
              <Markdown>{introText.text}</Markdown>
            </div>
            {introText.circularText && (
              <div className="circular-text mx-auto mt-8 max-h-[60svh] max-w-[60svh] h-full aspect-square relative">
                <span className="sr-only">{circularText}</span>
                <svg
                  viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}
                  className="circular-text-spin h-full w-full overflow-visible fill-current font-semibold text-zinc-700"
                  aria-hidden="true"
                >
                  <defs>
                    <path
                      id={circularTextId}
                      d={`M ${CIRCLE_CENTER},${CIRCLE_CENTER} m -${CIRCLE_RADIUS},0 a ${CIRCLE_RADIUS},${CIRCLE_RADIUS} 0 1,1 ${CIRCLE_RADIUS * 2},0 a ${CIRCLE_RADIUS},${CIRCLE_RADIUS} 0 1,1 -${CIRCLE_RADIUS * 2},0`}
                    />
                  </defs>
                  <text fontSize={circularFontSize}>
                    <textPath
                      href={`#${circularTextId}`}
                      startOffset="0%"
                      textLength={CIRCLE_CIRCUMFERENCE}
                      lengthAdjust="spacingAndGlyphs"
                    >
                      {circularText}
                    </textPath>
                  </text>
                </svg>
              </div>
            )}
            {introText.author && <div className="author text-right">–{introText.author}</div>}
          </div>
        ) : null;
      })}
    </div>
  );
}
