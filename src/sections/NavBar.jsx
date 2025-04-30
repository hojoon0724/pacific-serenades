import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

import PacSerStackLockup from "@/components/PacSerStackLockup";
import WaveBg from "@/components/WaveBg";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const hoverTimeout = useRef(null);

  const menuLinks = [
    // { name: "About", href: "/about", dropdown: true, dropdownPages: [{ name: "Our Team", href: "/team" }] },
    { name: "About", href: "/about", dropdown: false },
    // {
    //   name: "Library",
    //   href: "/library",
    //   dropdown: true,
    //   dropdownPages: [
    // { name: "All Concerts", href: "/all-concerts" },
    //     { name: "Past Seasons", href: "/past-seasons" },
    //     { name: "Commissions", href: "/commissions" },
    //     { name: "Composers", href: "/composers" },
    //     { name: "Musicians", href: "/musicians" },
    //   ],
    // },
    { name: "Schedule", href: "/schedule", dropdown: false },
    { name: "Commissions", href: "/library/commissions", dropdown: false },
    // { name: "Schedule", href: "/schedule", dropdown: false },
    { name: "Composers & Musicians", href: "/library/composers-musicians", dropdown: false },
    { name: "Contact", href: "/contact", dropdown: false },
  ];

  const socialLinks = [
    { platform: "facebook", link: "https://www.facebook.com/profile.php?id=100009776070655" },
    { platform: "instagram", link: "https://www.instagram.com/pacificserenades/" },
    { platform: "xtwitter", link: "https://x.com/pserenades" },
  ];

  const icons = {
    xtwitter: FaXTwitter,
    facebook: FaFacebook,
    instagram: FaInstagram,
  };

  return (
    <div className="nav-bar top-0 z-50">
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
          <NavbarContent className="lg:hidden pr-3 pt-6">
            <NavbarBrand className="flex align-center">
              <div className=" w-[150px]">
                <Link href="/">
                  <PacSerStackLockup fillColor="--ps-dark" />
                </Link>
              </div>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="lg:hidden p-0 pt-6" justify="end">
            <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
          </NavbarContent>

          {/* Desktop */}
          <NavbarContent className="hidden lg:flex gap-4" style={{ paddingLeft: "0" }} justify="end">
            <NavbarBrand>
              <div className="w-[200px]">
                <Link href="/">
                  <PacSerStackLockup fillColor="--ps-dark" />
                </Link>
              </div>
            </NavbarBrand>
            <div>
              <div className="social-links-container flex justify-end gap-3">
                {socialLinks.map((platform, index) => {
                  const Icon = icons[platform.platform];
                  return (
                    <a
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={index}
                      className="social-link flex justify-end items-center h-10 gap-3"
                    >
                      <div className="social-icon w-4 h-4">
                        <Icon />
                      </div>
                    </a>
                  );
                })}
              </div>
              <div className="flex gap-6">
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
                      <div
                        className={`absolute top-full mt-2 bg-white shadow-lg rounded-lg py-2 right-0 min-w-[12ch] text-right transition-all duration-300 ease-out transform ${hoveredDropdown === index ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
                      >
                        {link.dropdownPages.map((dropdownLink, idx) => (
                          <div key={idx} className="px-4 py-2 hover:bg-gray-100">
                            <Link href={`${link.href}${dropdownLink.href}`} onClick={() => setHoveredDropdown(null)}>
                              {dropdownLink.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NavbarItem key={index}>
                      <Link href={link.href}>{link.name}</Link>
                    </NavbarItem>
                  )
                )}
              </div>
            </div>
          </NavbarContent>

          {/* Mobile menu */}
          <NavbarMenu className="bg-blue-100">
            <NavbarMenuItem className="mobile-menu-container flex flex-col justify-between h-full">
              <div className="nav-bar-items-top flex flex-col gap-6">
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
                  )
                )}
              </div>
              <div className="nav-bar-items-bottom pb-16">
                <div className="social-links-container flex justify-end gap-6">
                  {socialLinks.map((platform, index) => {
                    const Icon = icons[platform.platform];
                    return (
                      <a
                        href={platform.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        className="social-link flex justify-end items-center h-10 gap-3"
                      >
                        {/* <div className="social-tag">{platform.platform}</div> */}
                        <div className="social-icon w-8 h-8">
                          <Icon className="w-full h-full" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </NavbarMenuItem>
          </NavbarMenu>
        </Navbar>
      </div>
    </div>
  );
}
