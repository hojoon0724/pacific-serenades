const currentYear = new Date().getFullYear();

export default function Footer({}) {
  return (
    <footer className="text-center flex flex-col gap-2">
      <div className="footer-line-1 pt-2">&copy; {currentYear} Pacific Serenades. All rights reserved. </div>
      <div className="footer-line-2 px-2" style={{ fontSize: "0.6rem" }}>
        Pacific Serenades is a registered trademark of International Association of Young Artist (IAOYA), a registered
        501c(3) Non-Profit Organization in California.
      </div>
      <div
        className="footer-line-3 bg-black w-full p-1"
        style={{ fontSize: "0.6rem", fontFamily: "Roboto Mono, monospace", fontWeight: "400", letterSpacing: "0.1ch" }}
      >
        <span style={{ color: "#009fff" }}>&#91;&nbsp;</span>
        <span style={{ color: "#da70d6" }}>designed&nbsp;</span>
        <span style={{ color: "#efefef" }}>and&nbsp;</span>
        <span style={{ color: "#b5cea8" }}>built&nbsp;</span>
        <span style={{ color: "#009fff" }}>&#93;&nbsp;</span>
        <span style={{ color: "#efefef" }}>by&nbsp;</span>
        <span style={{ color: "#ffd800" }}>&#123;&nbsp;</span>
        <span style={{ color: "#a2e6ff" }}>Hojoon Kim&nbsp;</span>
        <span style={{ color: "#ffd800" }}>&#125;</span>
      </div>
    </footer>
  );
}
