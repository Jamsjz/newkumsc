import Link from "next/link";
import Image from "next/image";
import { getEventsForYear, getYears } from "@/lib/gallery";

export async function generateStaticParams() {
  const years = getYears();
  return years.map((year) => ({ year }));
}

export const metadata = {
  title: "Yearly Gallery",
  description: "Explore event photos from a specific year.",
};

interface YearGalleryPageProps {
  params: { year: string };
}

export default function YearGalleryPage({ params }: YearGalleryPageProps) {
  const { year } = params;
  const events = getEventsForYear(year);

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Gallery - {year}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(events).map(([eventName, images]) => {
          const highlightImage = images && images.length > 0 ? images[0] : null;

          return (
            <Link href={`/gallery/${year}/${eventName}`} key={eventName}>
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
                  <h2 className="text-xl font-semibold text-gray-800">{eventName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h2>
                  <p className="text-gray-600">{images.length} photos</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
