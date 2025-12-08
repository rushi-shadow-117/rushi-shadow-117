
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SubscribeModal } from "@/components/interactions/SubscribeModal";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { href: "/work", label: "WORK" },
    { href: "/life", label: "LIFE" },
    { href: "/fun", label: "FUN" },
    { href: "/about", label: "ABOUT" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "CONTACT" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-40 p-6 md:p-8 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-black/5">
        {/* Logo Left */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold tracking-tighter text-lg group-hover:bg-neutral-800 transition-colors">
            RP
          </div>
          <span className="font-mono text-xs tracking-tight opacity-50 hidden sm:block">
            EST. 2001
          </span>
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium tracking-tight text-neutral-500 hover:text-black transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Button variant="secondary" icon={Terminal} onClick={() => setIsSubscribeOpen(true)}>
              SUBSCRIBE
            </Button>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="w-9 h-9 border border-black/10 flex items-center justify-center hover:bg-neutral-50 transition-colors md:hidden"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 stroke-[1.5]" />
            ) : (
              <Menu className="w-4 h-4 stroke-[1.5]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-white pt-32 px-6 transition-transform duration-300 ease-in-out md:hidden flex flex-col gap-6",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-semibold tracking-tight text-black hover:text-neutral-500"
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-8 border-t border-black/10 pt-8">
          <Button variant="primary" icon={Terminal} onClick={() => { setIsSubscribeOpen(true); setIsMobileMenuOpen(false); }}>
            SUBSCRIBE TO UPDATES
          </Button>
        </div>
      </div>

      <SubscribeModal isOpen={isSubscribeOpen} onClose={() => setIsSubscribeOpen(false)} />
    </>
  );
}
