import Footer from "@/sections/Footer";
import NavBar from "@/sections/NavBar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="nav-bar-container z-50">
        <NavBar />
      </div>

      <main className="overflow-y-auto">{children}</main>

      <div className="footer-container z-50">
        <Footer />
      </div>
    </div>
  );
}
