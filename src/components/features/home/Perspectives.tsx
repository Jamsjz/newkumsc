import * as React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials, Testimonial } from "@/lib/data";
import { QuoteIcon } from "lucide-react";

export function TestimonialCarousel(): React.JSX.Element {
  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {testimonials.map((testimonial: Testimonial, index: number) => (
            <CarouselItem key={index} className="md:basis-9/10 lg:basis-1/2">
              <div className="p-1">
                <Card className="border-none">
                  <CardContent className="flex flex-col p-7 rounded-lg min-h-[400px] overflow-visible">
                    {/* Logo and name aligned top right */}
                    <div className="flex flex-col items-end mb-4">
                      <div className="relative h-20 w-20 rounded-full overflow-hidden mb-2">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-base text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>

                    {/* Quote with icon below */}
                    <div className="flex flex-col flex-grow h-full justify-start">
                      <QuoteIcon
                        className="text-gray-400 self-start"
                        size={32}
                      />
                      <blockquote className="mt-4 text-lg leading-relaxed text-gray-800 dark:text-gray-200">
                        {testimonial.perspective}
                      </blockquote>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </div>
  );
}
