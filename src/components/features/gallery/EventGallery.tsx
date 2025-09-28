"use client";

import Image from "next/image";
import { ImageModal } from "@/components/shared/ImageModal";

type Image = {
  src: string;
  alt: string;
};

type EventGalleryProps = {
  images: Image[];
  event: string;
  year: string;
};

export default function EventGallery({ images, event, year }: EventGalleryProps) {
  const mainImage = images.length > 0 ? images[0] : null;
  const thumbnailImages = images.slice(1);

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">{event.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - {year}</h1>

      {mainImage && (
        <div className="mb-8 relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
          <ImageModal imageUrl={mainImage.src} alt={mainImage.alt}>
            {(openModal) => (
              <Image
                src={mainImage.src}
                alt={mainImage.alt}
                fill
                style={{ objectFit: "cover" }}
                className="cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={openModal}
              />
            )}
          </ImageModal>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {thumbnailImages.map((image, index) => (
          <ImageModal key={index} imageUrl={image.src} alt={image.alt}>
            {(openModal) => (
              <div className="relative w-full h-32 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  className="cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={openModal}
                />
              </div>
            )}
          </ImageModal>
        ))}
      </div>

      {images.length === 0 && (
        <p className="text-center text-gray-500">No images found for this event.</p>
      )}
    </main>
  );
}
