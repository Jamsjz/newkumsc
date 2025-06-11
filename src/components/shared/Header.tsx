import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ExpandableSearch } from "./ExpandableSearch";
import { getAllFrontMatter } from "@/lib/markdown";

interface ContentItem {
  slug: string;
  title: string;
  description: string;
  image?: string;
  type: "event" | "notice";
}

export interface SearchProps {
  events: ContentItem[];
  notices: ContentItem[];
}

export async function getSearchParams(): Promise<SearchProps> {
  const events = getAllFrontMatter("events").map((event) => ({
    ...event,
    type: "event" as const,
  }));

  const notices = getAllFrontMatter("notices").map((notice) => ({
    ...notice,
    type: "notice" as const,
  }));

  return {
    events: events,
    notices: notices,
  };
}

// --- CHANGE IS HERE: Added "Committee" to the navigation items ---
const navItems = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/committee", label: "Committee" }, // New navigation link
  { href: "/notices", label: "Notices" },
  { href: "/contact", label: "Contact" },
];
// --- END OF CHANGE ---

export async function Navbar() {
  const { events, notices } = await getSearchParams();
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
        <ExpandableSearch events={events} notices={notices} />
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
