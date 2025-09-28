import Link from "next/link";
import Image from "next/image";
import { getGalleryData, getYears } from "@/lib/gallery";

export const metadata = {
  title: "Gallery",
  description: "Explore our event photos by year.",
};

export default function GalleryPage() {
  const years = getYears();
  const galleryData = getGalleryData();

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Gallery</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {years.map((year) => {
          const yearEvents = galleryData[year];
          const firstEventName = Object.keys(yearEvents)[0];
          const firstEventImages = yearEvents[firstEventName];
          const highlightImage = firstEventImages && firstEventImages.length > 0 ? firstEventImages[0] : null;

          return (
            <Link href={`/gallery/${year}`} key={year}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {highlightImage && (
                  <div className="relative w-full h-48">
                    <Image
                      src={highlightImage.src}
                      alt={highlightImage.alt}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-2xl font-semibold text-gray-800">{year}</h2>
                  <p className="text-gray-600">{Object.keys(yearEvents).length} events</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
