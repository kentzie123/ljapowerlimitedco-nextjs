"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Hook to check active route
import { Twirl as Hamburger } from "hamburger-react";
import { navItems } from "@/constants"; // Ensure this path is correct

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const mobileNavRef = useRef(null);
  const hamburgerRef = useRef(null);
  const pathname = usePathname(); // Get current URL (e.g., "/contacts")

  // Close navbar if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Mobile Navigation */}
      <nav
        ref={mobileNavRef}
        aria-label="Mobile Navigation"
        className={`block lg:hidden px-4 py-8 fixed top-[72px] left-0 bg-backdrop w-full transition-all duration-500 ease-in-out z-40 ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-[-130%] opacity-0"
        }`}
      >
        <ul className="space-y-4">
          {navItems.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li className="relative group" key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`relative text-lg font-heading uppercase tracking-wide transition-all duration-300 transform after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-(--accent-yellow) after:transition-all after:duration-300 ${
                    isActive
                      ? "text-(--accent-yellow) after:w-full"
                      : "text-white hover:text-(--accent-yellow) after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          className="cursor-pointer btn-yellow mt-6 w-fit font-heading font-bold uppercase tracking-wider block"
          href="/contacts"
          onClick={() => setOpen(false)}
        >
          Get a Quote
        </Link>
      </nav>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        <nav className="flex items-center justify-between px-4 lg:px-8 py-3 bg-backdrop text-white shadow-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/lja-logo.webp"
              alt="LJA Power Limited Co Logo"
              width={40} // Sets intrinsic size
              height={40}
              className="rounded-full w-10 h-10 object-contain group-hover:rotate-12 transition-transform duration-500"
              priority // Loads immediately for SEO
            />
            <div className="flex flex-col justify-center leading-none">
              <span className="font-heading text-xl font-bold tracking-wide text-white group-hover:text-(--accent-yellow) transition-colors">
                LJA POWER
              </span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-gray-400">
                LIMITED Co
              </span>
            </div>
          </Link>

          <div className="h-full flex items-center">
            {/* Desktop Menu */}
            <ul className="lg:flex hidden items-center gap-8">
              {navItems.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li
                    className="relative group flex flex-col items-center justify-center"
                    key={link.href}
                  >
                    <Link
                      href={link.href}
                      className={`relative text-sm font-heading uppercase tracking-wider transition-all duration-300 transform after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-(--accent-yellow)r:transition-all after:duration-300 ${
                        isActive
                          ? "text-(--accent-yellow) -translate-y-0.5 after:w-full after:translate-y-1"
                          : "text-white hover:text-(--accent-yellow) hover:-translate-y-0.5 after:w-0 hover:after:w-full hover:after:translate-y-1"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Toggle */}
            <button
              ref={hamburgerRef}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="lg:hidden block text-white hover:text-(--accent-yellow) transition-colors ml-4"
            >
              <Hamburger toggled={isOpen} toggle={setOpen} size={24} />
            </button>
          </div>

          {/* Desktop CTA */}
          <Link
            href="/contacts"
            className="lg:block hidden btn-yellow font-heading font-bold uppercase tracking-wider text-sm px-6 py-2 shadow-lg hover:shadow-(--accent-yellow)/20"
          >
            Get a Quote
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
