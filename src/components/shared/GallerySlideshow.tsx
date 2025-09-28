'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface GalleryImage {
  src: string;
  alt: string;
}

interface GallerySlideshowProps {
  images: GalleryImage[];
  interval?: number; // Time in ms to switch images
}

const GallerySlideshow: React.FC<GallerySlideshowProps> = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return; // No need for slideshow if 0 or 1 image

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  if (images.length === 0) {
    return <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">No images available</div>;
  }

  const currentImage = images[currentIndex];

  return (
    <div className="relative w-full h-48 overflow-hidden">
      <Image
        src={currentImage.src}
        alt={currentImage.alt}
        fill
        style={{ objectFit: 'cover' }}
        className="transition-opacity duration-500 ease-in-out"
      />
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`h-2 w-2 rounded-full ${idx === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GallerySlideshow;
