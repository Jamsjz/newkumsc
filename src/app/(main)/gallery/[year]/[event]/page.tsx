import { getGalleryData, getImagesForEvent } from "@/lib/gallery";
import EventImageGallery from "@/components/features/gallery/EventImageGallery";

export function generateStaticParams() {
  const galleryData = getGalleryData();
  const params: { year: string; event: string }[] = [];

  for (const year in galleryData) {
    for (const eventName in galleryData[year]) {
      params.push({ year, event: eventName });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ year: string; event: string }> }) {
  const { year, event } = await params;
  return {
    title: `${event.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - ${year}`,
    description: `Photos from the ${event} event in ${year}.`,
  };
}

interface EventPageProps {
  params: Promise<{ year: string; event: string }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { year, event } = await params;
  const images = getImagesForEvent(year, event);

  return <EventImageGallery images={images} event={event} year={year} />;
}
