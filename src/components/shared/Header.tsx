"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// --- CHANGE IS HERE: Added "Committee" to the navigation items ---
const navItems = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/committee", label: "Committee" }, // New navigation link
  { href: "/notices", label: "Notices" },
  { href: "/contact", label: "Contact" },
];
// --- END OF CHANGE ---

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

export function Navbar() {
  return (
    <nav className="relative container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
      <Link href="/" className="flex items-center gap-2 font-bold">
        <Image src="/images/logo.svg" alt="KUMSC Logo" width={35} height={35} />
        <span className="hidden sm:inline">KUMSC</span>
      </Link>

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold md:hidden"
        aria-hidden="true"
      >
        KUMSC
      </div>

      <div className="hidden items-center gap-4 md:flex">
        {navItems.map((item) => (
          <Button key={item.label} variant="ghost" asChild>
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <ExpandableSearch />
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="text-left">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Select a page to navigate to or use the search bar to find
                  content.
                </SheetDescription>
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

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Navbar />
    </header>
  );
}
