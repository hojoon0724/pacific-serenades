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
import PacSerStackLockup from '@/components/PacSerStackLockup';
import WaveBg from '@/components/WaveBg';

export default function NavBar({}) {
  return (
    <>
      <WaveBg />
      <div className="nav-bar-container w-screen max-w-[1200px] flex justify-center items-center mx-auto pb-[7vw]">
        <Navbar maxWidth="full" isBlurred="false" style={{ backgroundColor: 'transparent', padding: '0' }}>
          <NavbarBrand>
            <div className="top-logo w-[200px]">
              <Link href="/">
                <PacSerStackLockup fillColor={'--ps-dark'} />
              </Link>
            </div>
          </NavbarBrand>

          <NavbarContent className="hidden sm:flex gap-4" justify="end">
            <NavbarItem>
              <Link href="/about">About</Link>
            </NavbarItem>

            <NavbarItem>
              <Link href="/composers">Composers</Link>
            </NavbarItem>

            <NavbarItem>
              <Link href="/musicians">Musicians</Link>
            </NavbarItem>

            <NavbarItem>
              <Link href="/commissions">Commissions</Link>
            </NavbarItem>

            <NavbarItem>
              <Link href="/past-seasons">Past Seasons</Link>
            </NavbarItem>

            <NavbarItem>
              <Link href="/contact">Contact</Link>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
    </>
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
