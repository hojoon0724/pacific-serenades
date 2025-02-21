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

export default function NavBar({}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hoverTimeout = useRef(null);

  const menuLinks = [
    { name: "About", href: "/about", dropdown: false },
    // {
    //   name: 'Library',
    //   href: '/library',
    //   dropdown: true,
    //   dropdownPages: [
    //     { name: 'All Concerts', href: '/all-concerts' },
    //     { name: 'Past Seasons', href: '/past-seasons' },
    //     { name: 'Commissions', href: '/commissions' },
    //     { name: 'Composers', href: '/composers' },
    //     { name: 'Musicians', href: '/musicians' },
    //   ],
    // },
    // { name: 'Schedule', href: '/schedule', dropdown: false },
    // { name: 'Contact', href: '/contact', dropdown: false },
  ];

  return (
    <div className="nav-bar sticky top-0 z-50">
      <WaveBg />
      <div className="nav-bar-container w-screen max-w-[1200px] flex justify-center items-end mx-auto font-semibold">
        <Navbar
          maxWidth="full"
          isBlurred="false"
          style={{ backgroundColor: "transparent", padding: "0" }}
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
        >
          {/* mobile */}
          <NavbarContent className="md:hidden pr-3 pt-6">
            <NavbarBrand className="flex align-center">
              <div className=" w-[150px]">
                <Link href="/">
                  <PacSerStackLockup fillColor={"--ps-dark"} />
                </Link>
              </div>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="md:hidden p-0 pt-6" justify="end">
            <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
          </NavbarContent>

          {/* desktop */}
          <NavbarContent className="hidden md:flex gap-4" style={{ paddingLeft: "0" }} justify="end">
            <NavbarBrand>
              <div className="w-[200px]">
                <Link href="/">
                  <PacSerStackLockup fillColor={"--ps-dark"} />
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
                    setHovered(true);
                  }}
                  onMouseLeave={() => {
                    hoverTimeout.current = setTimeout(() => setHovered(false), 200); // 200ms delay
                  }}
                >
                  <NavbarItem>
                    <Link href={link.href}>{link.name}</Link>
                  </NavbarItem>
                  {hovered && (
                    <div className="absolute top-full mt-2 bg-white shadow-lg rounded-lg py-2">
                      {link.dropdownPages.map((dropdownLink, idx) => (
                        <div key={idx} className="px-4 py-2 hover:bg-gray-100">
                          <Link href={`${link.href}${dropdownLink.href}`} onClick={() => setHovered(false)}>
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

          {/* mobile menu */}
          <NavbarMenu>
            <NavbarMenuItem className="mobile-menu-container flex flex-col gap-6 ">
              {menuLinks.map((link, index) =>
                link.dropdown ? (
                  <div className="main-nav-link-container" key={index}>
                    <Link
                      key={index}
                      className="w-full"
                      size="lg"
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-2xl">{link.name}</span>
                    </Link>
                    <div className="secondary-nav-link-container flex flex-col">
                      {link.dropdownPages.map((dropdownLink, index) => (
                        <Link
                          key={index}
                          className="w-full"
                          size="md"
                          href={`${link.href}${dropdownLink.href}`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="uppercase text-sm" style={{ lineHeight: ".8rem" }}>
                            {dropdownLink.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="main-nav-link-container" key={index}>
                    <Link
                      key={index}
                      className="w-full"
                      size="lg"
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-2xl">{link.name}</span>
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
