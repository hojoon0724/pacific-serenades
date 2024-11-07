import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';

import Link from 'next/link';
import PacSerWideLockup from '@/components/PacSerWideLockup';
import WaveBg from '@/components/WaveBg';

export default function NavBar({}) {
  return (
    <div className="nav-bar-container w-screen max-w-[1200px] flex justify-center items-center mx-auto">
      <Navbar maxWidth="full">
        <NavbarBrand>
          <div className="top-logo w-[300px]">
            <Link href="/">
              <PacSerWideLockup fillColor={'--ps-dark'} />
            </Link>
          </div>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <NavbarItem>
            <Link color="foreground" href="/about">
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/past-seasons">History</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/contact">Contact</Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
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
