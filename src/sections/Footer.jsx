const currentYear = new Date().getFullYear();

export default function Footer({}) {
  return (
    <footer className="text-center py-2">
      <div className="footer-line-1 pb-2">&copy; {currentYear} Pacific Serenades. All rights reserved. </div>
      <div className="footer-line-2">
        Pacific Serenades is a registered trademark of International Association of Young Artist (IAOYA), a registered
        501c(3) Non-Profit Organization in California.
      </div>
    </footer>
  );
}
