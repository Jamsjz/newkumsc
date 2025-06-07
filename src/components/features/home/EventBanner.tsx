"use client";

import { useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { FrontMatter } from "@/lib/markdown";

export function EventBanner({ events = [] }: { events: FrontMatter[] }) {
  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
    }),
  );

  // Fallback UI with responsive typography
  if (!events || events.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh] sm:h-[60vh] md:h-[75vh] bg-muted/40 rounded-lg p-4">
        <div className="text-center text-muted-foreground">
          <h2 className="text-xl sm:text-2xl font-semibold">
            No Upcoming Events
          </h2>
          <p className="mt-1 text-sm sm:text-base">
            Please check back later for new announcements.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full overflow-hidden"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {events.map((event, idx) => (
          <CarouselItem key={idx} className="basis-full">
            <Card className="rounded-none border-none">
              <CardContent className="relative p-0 h-[50vh] sm:h-[60vh] md:h-[75vh]">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  priority={idx === 0}
                  className="object-cover w-full h-full"
                />
                {/* Overlay with responsive padding */}
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-4 sm:p-8">
                  {/* Container with responsive max-width to control line length */}
                  <div className="max-w-sm sm:max-w-md md:max-w-2xl">
                    {/* Responsive title font size */}
                    <h2 className="font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                      {event.title}
                    </h2>
                    {/* Responsive description font size and top margin */}
                    <p className="mt-2 text-sm text-gray-200 sm:text-base md:text-lg">
                      {event.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
