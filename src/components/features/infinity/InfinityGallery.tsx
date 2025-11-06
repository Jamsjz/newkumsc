"use client";
import React from 'react';
import GallerySlideshow from '@/components/shared/GallerySlideshow';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const dummyImages = [
  { src: '/images/events/2025-001.jpg', alt: 'Event image 1' },
  { src: '/images/events/2025-002.jpg', alt: 'Event image 2' },
  { src: '/images/events/2025-003/2025-003.jpg', alt: 'Event image 3' },
  { src: '/images/events/2025-004.jpg', alt: 'Event image 4' },
  { src: '/images/events/2025-005.jpg', alt: 'Event image 5' },
];

const InfinityGallery: React.FC = () => {
  return (
    <section className="py-20 bg-white text-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Infinity Gallery</h2>
        <div className="max-w-4xl mx-auto">
          <GallerySlideshow images={dummyImages} />
          <div className="text-center mt-8">
            <Link href="/gallery/infinity">
              <Button>View Previous Years</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfinityGallery;
