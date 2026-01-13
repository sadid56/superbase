"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Drawer } from "vaul";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface MobileMenuProps {
  navLinks: { name: string; href: string }[];
  pathname: string;
}

const MobileMenu = ({ navLinks, pathname }: MobileMenuProps) => {
  return (
    <Drawer.Root direction='left'>
      <Drawer.Trigger asChild>
        <button className='p-2 -mr-2 md:hidden'>
          <Menu className='w-6 h-6 text-custom-primary' />
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/20 z-50 backdrop-blur-[10px]' />
        <Drawer.Content className='bg-white flex flex-col h-full w-[80%] max-w-[300px] mt-24 fixed bottom-0 left-0 z-50 shadow-xl outline-none'>
          <Drawer.Title className='sr-only' />
          <div className='p-4 border-b flex items-center justify-between'>
            <span className='font-bold text-lg'>Menu</span>

            <Drawer.Close asChild>
              <button className='p-2'>
                <X className='w-5 h-5 text-gray-500' />
              </button>
            </Drawer.Close>
          </div>

          <div className='flex-1 overflow-y-auto p-4'>
            <ul className='flex flex-col gap-4'>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-[16px] font-medium block py-2 transition-colors",
                        isActive ? "text-custom-primary font-semibold" : "text-custom-gray hover:text-custom-primary"
                      )}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className='mt-8 pt-8 border-t space-y-4'>
              <Button className='btn-gradient w-full h-12'>Sign In</Button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default MobileMenu;
