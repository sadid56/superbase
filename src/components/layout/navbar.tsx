/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "../global/Container";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import MobileMenu from "./mobile-menu";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Programs & services", href: "/programs-services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const linkStyles = "text-[15px] leading-[15px] font-semibold uppercase transition-colors";

  return (
    <nav className='py-4 md:py-8 bg-white shadow'>
      <Container className='flex items-center justify-between'>
        <Link href='/' className='shrink-0 w-24 md:w-auto'>
          <img src='/logo.png' alt='logo' className='' />
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-12'>
          <div>
            <ul className='flex items-center gap-6'>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link href={link.href} className={cn(linkStyles, isActive ? "text-custom-primary" : "text-custom-gray")}>
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className='flex items-center gap-6'>
            <button className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
              <img src='/bag.svg' alt='bag' className='w-5 h-5' />
            </button>
            <Button className='btn-gradient h-12 px-6'>sign in</Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileMenu navLinks={navLinks} pathname={pathname} />
      </Container>
    </nav>
  );
};

export default Navbar;
