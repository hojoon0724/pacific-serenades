import Footer from "@/sections/Footer";
import NavBar from "@/sections/NavBar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      <div className="nav-bar-container z-50 relative">
        <NavBar />
      </div>

      <main className="overflow-y-auto relative z-10">{children}</main>

      <div className="footer-container z-20 relative">
        <Footer />
      </div>
    </div>
  );
}
