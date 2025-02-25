import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  dropdown,
} from "@nextui-org/react";

import { useRef, useState } from "react";
import Link from "next/link";
import PacSerWideLockup from "@/components/PacSerWideLockup";
import PacSerStackLockup from "@/components/PacSerStackLockup";
import WaveBg from "@/components/WaveBg";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const hoverTimeout = useRef(null);

  const menuLinks = [
    { name: "About", href: "/about", dropdown: true, dropdownPages: [{ name: "Our Team", href: "/team" }] },
    {
      name: "Library",
      href: "/library",
      dropdown: true,
      dropdownPages: [
        // { name: "All Concerts", href: "/all-concerts" },
        { name: "Past Seasons", href: "/past-seasons" },
        { name: "Commissions", href: "/commissions" },
        { name: "Composers", href: "/composers" },
        { name: "Musicians", href: "/musicians" },
      ],
    },
    // { name: 'Schedule', href: '/schedule', dropdown: false },
    // { name: 'Contact', href: '/contact', dropdown: false },
  ];

  return (
    <div className="nav-bar sticky top-0 z-50">
      <WaveBg />
      <div className="nav-bar-container w-screen max-w-[1200px] flex justify-center items-end mx-auto font-semibold">
        <Navbar
          maxWidth="full"
          isBlurred={false}
          style={{ backgroundColor: "transparent", padding: "0" }}
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
        >
          {/* Mobile */}
          <NavbarContent className="md:hidden pr-3 pt-6">
            <NavbarBrand className="flex align-center">
              <div className=" w-[150px]">
                <Link href="/">
                  <PacSerStackLockup fillColor="--ps-dark" />
                </Link>
              </div>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="md:hidden p-0 pt-6" justify="end">
            <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
          </NavbarContent>

          {/* Desktop */}
          <NavbarContent className="hidden md:flex gap-4" style={{ paddingLeft: "0" }} justify="end">
            <NavbarBrand>
              <div className="w-[200px]">
                <Link href="/">
                  <PacSerStackLockup fillColor="--ps-dark" />
                </Link>
              </div>
            </NavbarBrand>
            {menuLinks.map((link, index) =>
              link.dropdown ? (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => {
                    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                    setHoveredDropdown(index);
                  }}
                  onMouseLeave={() => {
                    hoverTimeout.current = setTimeout(() => setHoveredDropdown(null), 200);
                  }}
                >
                  <NavbarItem>
                    <Link href={link.href}>{link.name}</Link>
                  </NavbarItem>
                  {hoveredDropdown === index && (
                    <div className="absolute top-full mt-2 bg-white shadow-lg rounded-lg py-2 right-0 min-w-[12ch] text-right">
                      {link.dropdownPages.map((dropdownLink, idx) => (
                        <div key={idx} className="px-4 py-2 hover:bg-gray-100">
                          <Link href={`${link.href}${dropdownLink.href}`} onClick={() => setHoveredDropdown(null)}>
                            {dropdownLink.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavbarItem key={index}>
                  <Link href={link.href}>{link.name}</Link>
                </NavbarItem>
              ),
            )}
          </NavbarContent>

          {/* Mobile menu */}
          <NavbarMenu style={{ top: "0" }}>
            <NavbarMenuItem className="mobile-menu-container flex flex-col gap-6">
              {menuLinks.map((link, index) =>
                link.dropdown ? (
                  <div className="main-nav-link-container" key={index}>
                    <Link className="w-full text-2xl" href={link.href} onClick={() => setIsMenuOpen(false)}>
                      {link.name}
                    </Link>
                    <div className="secondary-nav-link-container flex flex-col">
                      {link.dropdownPages.map((dropdownLink, idx) => (
                        <Link
                          key={idx}
                          className="w-full uppercase text-sm"
                          href={`${link.href}${dropdownLink.href}`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropdownLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="main-nav-link-container" key={index}>
                    <Link className="w-full text-2xl" href={link.href} onClick={() => setIsMenuOpen(false)}>
                      {link.name}
                    </Link>
                  </div>
                ),
              )}
            </NavbarMenuItem>
          </NavbarMenu>
        </Navbar>
      </div>
    </div>
  );
}
