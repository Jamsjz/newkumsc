import Image from "next/image";
import { getImagesForEvent, getGalleryData } from "@/lib/gallery";

export async function generateStaticParams() {
  const galleryData = getGalleryData();
  const params: { year: string; event: string }[] = [];

  for (const year in galleryData) {
    for (const eventName in galleryData[year]) {
      params.push({ year, event: eventName });
    }
  }
  return params;
}

export const metadata = {
  title: "Event Gallery",
  description: "All photos from a specific event.",
};

interface EventImagesPageProps {
  params: { year: string; event: string };
}

export default function EventImagesPage({ params }: EventImagesPageProps) {
  const { year, event } = params;
  const images = getImagesForEvent(year, event);

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">{event.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - {year}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
