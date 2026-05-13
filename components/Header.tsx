"use client";

import Link from "next/link";
import { useState } from "react";
import { SynaLogo } from "./SynaLogo";
import { useCart } from "./CartContext";

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
      />
    </svg>
  );
}

function NavDropdown({
  label,
  href,
  items,
}: {
  label: string;
  href: string;
  items: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center gap-1">
        <Link href={href} className="hover:underline">
          {label}
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="cursor-pointer text-[10px] leading-none"
        >
          {open ? "−" : "+"}
        </button>
      </div>
      {open && (
        <div className="ml-2 flex flex-col gap-1 mt-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggle: toggleCart, totalItems } = useCart();

  const navContent = (
    <>
      <Link href="/collections/new" className="hover:underline">
        NEW
      </Link>
      <NavDropdown
        label="MEN'S"
        href="/collections/mens"
        items={[
          { label: "TOPS", href: "/collections/mens-tops" },
          { label: "BOTTOMS", href: "/collections/mens-bottoms" },
          { label: "OUTERWEAR", href: "/collections/mens-outerwear" },
          { label: "TRACKSUITS", href: "/collections/tracksuits" },
          { label: "HATS", href: "/collections/mens-hats" },
          { label: "BAGS", href: "/collections/mens-bags" },
          { label: "ACCESSORIES", href: "/collections/mens-accessories" },
          { label: "VIEW ALL", href: "/collections/mens" },
        ]}
      />
      <NavDropdown
        label="COLLABS"
        href="/collections/collabs"
        items={[
          { label: "PAF", href: "/collections/syna-x-paf" },
          { label: "BAPE", href: "/collections/syna-x-bape" },
          { label: "G-SHOCK", href: "/collections/syna-x-g-shock" },
          { label: "NEW ERA", href: "/collections/syna-x-new-era" },
        ]}
      />
      <Link href="/collections/archive" className="hover:underline">
        ARCHIVE
      </Link>
      <Link href="/pages/contact" className="hover:underline">
        Support
      </Link>
      <NavDropdown
        label="Social"
        href="#"
        items={[
          {
            label: "Syna Insta",
            href: "https://www.instagram.com/synaworld",
          },
          {
            label: "Central Cee Insta",
            href: "https://www.instagram.com/centralcee",
          },
        ]}
      />
      <Link href="/pages/subscribe" className="hover:underline">
        MAILING LIST
      </Link>
    </>
  );

  return (
    <>
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            className="absolute inset-0 bg-black/20"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-neutral-900 p-6 flex flex-col gap-4 text-xs overflow-y-auto">
            <button
              className="self-end text-3xl leading-none"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            {navContent}
          </aside>
        </div>
      )}

      <header className="flex md:flex-col items-center md:items-start justify-between w-full md:justify-start md:gap-8 sticky top-4 md:top-8 self-start z-10">
        <Link href="/">
          <span className="sr-only">Syna World</span>
          <SynaLogo />
        </Link>

        <nav
          role="navigation"
          className="flex-col hidden md:flex text-xs gap-2"
        >
          {navContent}
        </nav>

        <button onClick={toggleCart} className="text-xs flex gap-2 items-center cursor-pointer">
          <span className="sr-only">Cart</span>
          <CartIcon />
          {totalItems > 0 && (
            <span className="text-[10px]">({totalItems})</span>
          )}
        </button>

        <button
          className="md:hidden text-3xl leading-none"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Menu"
        >
          &#9776;
        </button>
      </header>
    </>
  );
}
