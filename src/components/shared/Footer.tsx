import Link from "next/link";
import Image from "next/image";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { clubSocials } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8 sm:px-6 md:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Left Section: Logo and Club Name */}
          <div className="flex items-center gap-2">
            <Image src="/images/logo.svg" alt="KUMSC Logo" width={30} height={30} />
            <div className="flex flex-col text-sm">
              <span className="font-bold">KUMSC</span>
              <span className="text-muted-foreground">
                Kathmandu University Mathematics Student&apos;s Club
              </span>
            </div>
          </div>

          {/* Right Section: Social Media Icons */}
          <div className="flex items-center gap-2">
            {clubSocials.github && (
              <Button variant="ghost" size="icon" asChild>
                <Link href={clubSocials.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            )}
            {clubSocials.instagram && (
              <Button variant="ghost" size="icon" asChild>
                <Link href={clubSocials.instagram} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
            )}
            {clubSocials.facebook && (
              <Button variant="ghost" size="icon" asChild>
                <Link href={clubSocials.facebook} target="_blank" rel="noopener noreferrer">
                  <FacebookIcon className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
            )}
            {clubSocials.linkedin && (
              <Button variant="ghost" size="icon" asChild>
                <Link href={clubSocials.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedinIcon className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Bottom Section: Copyright Notice */}
        <div className="mt-6 border-t pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} KUMSC. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
