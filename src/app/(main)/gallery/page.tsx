import { getSlideshowHighlights, getYears } from "@/lib/gallery";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Gallery",
  description: "A collection of photos from our events over the years.",
};

export default function GalleryPage() {
  const highlights = getSlideshowHighlights(5);
  const years = getYears();

  return (
    <div className="bg-background text-foreground">
      <header className="text-center py-16">
        <h1 className="text-5xl font-extrabold tracking-tight">Our Visual Journey</h1>
        <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">Explore a collection of moments captured during our events, workshops, and gatherings throughout the years.</p>
      </header>

      <section className="w-full mb-24">
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {highlights.map((image, index) => {
              const year = image.src.split('/')[3];
              return (
                <CarouselItem key={index}>
                  <div className="relative w-full h-[60vh] min-h-[400px]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      style={{ objectFit: "cover" }}
                      className="brightness-50"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/40">
                      <h3 className="text-4xl font-bold">{image.alt.split(' - ')[0].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                      <p className="text-xl mt-2">{year}</p>
                      <Button asChild className="mt-6 animate-bounce">
                        <Link href={`/gallery/${year}`}>View Gallery <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Browse by Year</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {years.map(year => (
            <Link key={year} href={`/gallery/${year}`}>
              <Card className="overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl">
                <CardContent className="p-0">
                  <div className="bg-primary text-primary-foreground text-center p-8">
                    <h3 className="text-5xl font-bold">{year}</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
