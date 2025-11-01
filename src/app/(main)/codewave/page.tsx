"use client";
import React from 'react';
import HeroSection from '@/components/shared/HeroSection';
import Image from 'next/image';

const CodewavePage: React.FC = () => {
  return (
    <div>
      <HeroSection
        title="Codewave"
        description="Description for Codewave page."
      />
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center mb-8">
          {/* Add your logo here */}
          {/* <Image 
            src="/path/to/your/logo.png" 
            alt="Codewave Logo" 
            width={150}
            height={150}
          /> */}
        </div>
        <h1 className="text-4xl font-bold text-center">Codewave</h1>
        <p className="text-lg text-center mt-4">Details about Codewave will be updated here soon.</p>
      </div>
    </div>
  );
};

export default CodewavePage;
