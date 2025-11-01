"use client";
import React from 'react';
import HeroSection from '@/components/shared/HeroSection';
import Image from 'next/image';

const InfinityPage: React.FC = () => {
  return (
    <div>
      <HeroSection
        title="Infinity"
        description="Description for Infinity page."
      />
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center mb-8">
          <Image 
            src="/images/infinity.png" 
            alt="" 
            width={200}
            height={200}
          />
        </div>
        <p className="text-lg text-center mt-4">Details about Infinity will be updated here soon.</p>
      </div>
    </div>
  );
};

export default InfinityPage;
