"use client";
import React from 'react';
import HeroSection from '@/components/shared/HeroSection';

import Highlights from '@/components/features/infinity/Highlights';
import PlannedEvents from '@/components/features/infinity/PlannedEvents';
import InfinityGallery from '@/components/features/infinity/InfinityGallery';

const InfinityPage: React.FC = () => {
  return (
    <div>
      <HeroSection
        title="Infinity"
        description="A celebration of mathematics, creativity, and innovation."
        logo="/images/infinity.png"
      />
      <div className="container mx-auto px-4 py-16">
        <Highlights />
        <PlannedEvents />
        <InfinityGallery />
      </div>
    </div>
  );
};

export default InfinityPage;
