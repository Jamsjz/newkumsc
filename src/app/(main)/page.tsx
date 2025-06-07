import Image from "next/image"; // Import the Next.js Image component
import Link from "next/link";
import { EventBanner } from "@/components/features/home/EventBanner";
import { Button } from "@/components/ui/button";
import { getAllFrontMatter } from "@/lib/markdown";
import { ArrowRight } from "lucide-react";

function KUMSCinfo() {
  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="text-balance text-left text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
        Kathmandu University Mathematics Student's Club
      </h1>
      <p className="max-w-2xl text-left text-muted-foreground">
        Where passion meets precision. Join our community to explore, learn, and
        contribute to the vibrant world of mathematics.
      </p>
      <Button asChild size="lg" className="mt-4">
        <Link href="/events">
          Explore Events
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

export default function HomePage() {
  const events = getAllFrontMatter("events");

  return (
    <main className="flex flex-col gap-16 md:gap-24 animate__animated animate__fadeIn">
      {/* Section 1: Full-width Event Banner */}

      {/* Section 2: Info section with image */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* Left Column: Informational Text */}
          <div className="order-2 md:order-1">
            <KUMSCinfo />
          </div>

          {/* Right Column: Image */}
          <div className="order-1 md:order-2">
            {/* The placeholder is replaced with a responsive Image component */}
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 md:h-96">
              <Image
                src="/images/kumsc-cover.png"
                alt="A cover image featuring students from the KUMSC"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <EventBanner events={events} />
      </section>
    </main>
  );
}
