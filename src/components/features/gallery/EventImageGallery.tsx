"use client";

import Image from "next/image";
import { ImageModal } from "@/components/shared/ImageModal";
import { GalleryImage } from "@/lib/gallery";
import { Maximize } from "lucide-react";


type EventImageGalleryProps = {
  images: GalleryImage[];
  event: string;
  year: string;
};

export default function EventImageGallery({ images, event, year }: EventImageGalleryProps) {

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="text-center py-16">
        <h1 className="text-5xl font-extrabold tracking-tight">{event.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h1>
        <p className="text-muted-foreground text-lg mt-4">{year}</p>
      </header>

      <main className="container mx-auto px-4 pb-16">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((image, index) => (
            <ImageModal key={index} imageUrl={image.src} alt={image.alt}>
              {(openModal) => (
                <div 
                  className="relative block w-full rounded-lg overflow-hidden shadow-lg group cursor-pointer"
                  onClick={openModal}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={500} // Provide a base width
                    height={300} // Provide a base height
                    className="w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Maximize className="h-12 w-12 text-white" />
                  </div>
                </div>
              )}
            </ImageModal>
          ))}
        </div>

        {images.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-16">No images found for this event.</p>
        )}
      </main>
    </div>
  );
}
