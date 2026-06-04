import Footer from "@/sections/Footer";
import NavBar from "@/sections/NavBar";

export default function Layout({ children }) {
  return (
    <div className="relative flex h-[100svh] min-h-[100svh] flex-col">
      <div className="nav-bar-container relative z-50 shrink-0">
        <NavBar />
      </div>
      <main className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">{children}</main>
      <div className="footer-container relative z-20 shrink-0">
        <Footer />
      </div>
    </div>
  );
}
