import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from '@nextui-org/react';

import { useState } from 'react';
import Link from 'next/link';
import PacSerWideLockup from '@/components/PacSerWideLockup';
import PacSerStackLockup from '@/components/PacSerStackLockup';
import WaveBg from '@/components/WaveBg';

export default function NavBar({}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuLinks = [
    { name: 'About', href: '/about' },
    { name: 'Composers', href: '/composers' },
    { name: 'Musicians', href: '/musicians' },
    { name: 'Commissions', href: '/commissions' },
    { name: 'Past Seasons', href: '/past-seasons' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <div className="nav-bar sticky top-0 z-50">
      <WaveBg />
      <div className="nav-bar-container w-screen max-w-[1200px] flex justify-center items-end mx-auto">
        <Navbar
          maxWidth="full"
          isBlurred="false"
          style={{ backgroundColor: 'transparent', padding: '0' }}
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
        >
          {/* mobile */}
          <NavbarContent className="sm:hidden pr-3">
            <NavbarBrand>
              <div className="top-logo w-[200px]">
                <Link href="/">
                  <PacSerStackLockup fillColor={'--ps-dark'} />
                </Link>
              </div>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="sm:hidden" justify="end">
            <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
          </NavbarContent>

          {/* desktop */}
          <NavbarContent className="hidden sm:flex gap-4" justify="end">
            <NavbarBrand>
              <div className="top-logo w-[200px]">
                <Link href="/">
                  <PacSerStackLockup fillColor={'--ps-dark'} />
                </Link>
              </div>
            </NavbarBrand>
            {menuLinks.map((link, index) => (
              <NavbarItem key={index}>
                <Link href={link.href}>{link.name}</Link>
              </NavbarItem>
            ))}
          </NavbarContent>

          {/* mobile menu */}
          <NavbarMenu>
            <NavbarMenuItem className="flex flex-col gap-4 mt-12">
              {menuLinks.map((link, index) => (
                <Link key={index} className="w-full" size="lg" href={link.href} onClick={() => setIsMenuOpen(false)}>
                  {link.name}
                </Link>
              ))}
            </NavbarMenuItem>
          </NavbarMenu>
        </Navbar>
      </div>
    </div>
  );
}

/*
      <div className="nav-container flex justify-between items-center w-full max-w-[1200px] mx-auto p-4 ">
  <div className="top-logo w-[300px]">
    <Link href="/">
      
    </Link>
  </div>
  <div className="nav-buttons-container">
    <Link className="ml-6" href="/about">
      About
    </Link>
    <Link className="ml-6" href="/composers">
      Composers
    </Link>
    <Link className="ml-6" href="/past-seasons">
      past-seasons
    </Link>
    <Link className="ml-6" href="/past-concerts">
      past-concerts
    </Link>
  </div>
  */
