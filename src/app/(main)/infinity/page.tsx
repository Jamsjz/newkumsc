"use client";
import React from 'react';
import HeroSection from '@/components/shared/HeroSection';
import Image from 'next/image';
import Highlights from '@/components/features/infinity/Highlights';
import PlannedEvents from '@/components/features/infinity/PlannedEvents';

const InfinityPage: React.FC = () => {
  return (
    <div>
      <HeroSection
        title="Infinity"
        description="A celebration of mathematics, creativity, and innovation."
      />
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center mb-8">
          <Image 
            src="/images/infinity.png" 
            alt="Infinity Logo" 
            width={150}
            height={150}
          />
        </div>
        <h1 className="text-4xl font-bold text-center">Infinity</h1>
        <p className="text-lg text-center mt-4">Welcome to Infinity, our annual flagship event. Join us for a series of exciting events, workshops, and competitions.</p>
      </div>
      <Highlights />
      <PlannedEvents />
    </div>
  );
};

export default InfinityPage;