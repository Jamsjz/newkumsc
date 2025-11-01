"use client";
import React from 'react';
import HeroSection from '@/components/shared/HeroSection';

const OlympiadPage: React.FC = () => {
  return (
    <div>
      <HeroSection
        title="Mathematics Olympiad"
        description="Showcase your mathematical skills and compete with the best."
      />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center">Mathematics Olympiad</h1>
        <p className="text-lg text-center mt-4">Details about the Olympiad will be updated here soon.</p>
      </div>
    </div>
  );
};

export default OlympiadPage;
