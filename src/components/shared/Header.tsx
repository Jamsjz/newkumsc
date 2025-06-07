"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

// Define navigation items in a constant for easy management
const navItems = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/notices", label: "Notices" },
  { href: "/contact", label: "Contact" },
];

/**
 * A reusable component for the expandable search bar UI.
 * It is only visible on medium screens and larger.
 */
function ExpandableSearch() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="hidden items-center justify-end md:flex">
      <div
        className={`flex items-center rounded-full border ${
          isExpanded ? "border-primary" : "border-transparent"
        } transition-all duration-300`}
      >
        <Input
          type="search"
          placeholder="Search..."
          className={`h-9 transition-all duration-300 ease-in-out ${
            isExpanded ? "w-48 scale-x-100 pr-8" : "w-0 scale-x-0"
          } border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0`}
          onBlur={() => setIsExpanded(false)}
        />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

/**
 * The main navigation bar component.
 * It handles the layout for desktop and triggers the mobile sheet.
 */
export function Navbar() {
  return (
    <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center gap-2 font-bold">
        <Image src="/images/logo.svg" alt="KUMSC Logo" width={35} height={35} />
        <span className="hidden sm:inline">KUMSC</span>
      </Link>

      {/* Center: Desktop Navigation Links */}
      <div className="hidden items-center gap-4 md:flex">
        {navItems.map((item) => (
          <Button key={item.label} variant="ghost" asChild>
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </div>

      {/* Right: Search Bar and Mobile Menu */}
      <div className="flex items-center gap-2">
        <ExpandableSearch />

        {/* Mobile Menu Sheet */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <Link href="/" className="flex items-center gap-2 font-bold">
                  <Image
                    src="/images/logo.svg"
                    alt="KUMSC Logo"
                    width={35}
                    height={35}
                  />
                  <span>KUMSC</span>
                </Link>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                {/* Mobile Navigation Links */}
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    className="justify-start text-lg"
                    asChild
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
              </div>
              {/* Mobile Search Input */}
              <div className="relative mt-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search events and notices"
                  className="pl-10"
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

/**
 * The main header component that wraps the Navbar.
 * It provides the sticky positioning and background styling.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Navbar />
    </header>
  );
}
