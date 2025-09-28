import { getYears, getEventsForYear } from "@/lib/gallery";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Camera } from "lucide-react";

export function generateStaticParams() {
  const years = getYears();
  return years.map(year => ({ year }));
}

export async function generateMetadata({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  return {
    title: `Gallery - ${year}`,
    description: `A collection of photos from our events in ${year}.`,
  };
}

interface YearPageProps {
  params: Promise<{ year: string }>;
}

export default async function YearPage({ params }: YearPageProps) {
  const { year } = await params;
  const events = getEventsForYear(year);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="text-center py-16">
        <h1 className="text-5xl font-extrabold tracking-tight">{year} Gallery</h1>
        <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">Browse through the memorable moments from all our events held in {year}.</p>
      </header>

      <main className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(events).map(([eventName, images]) => (
            <Link key={eventName} href={`/gallery/${year}/${eventName}`}>
              <Card className="group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="relative w-full h-60">
                    <Image
                      src={images[0]?.src || "/images/placeholder.png"}
                      alt={images[0]?.alt || eventName}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                  <div className="p-6 bg-card">
                    <h3 className="text-xl font-bold truncate">{eventName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                    <div className="flex items-center text-muted-foreground mt-2">
                      <Camera className="h-4 w-4 mr-2" />
                      <span>{images.length} photos</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
