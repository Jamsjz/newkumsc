"use client";
import React from 'react';
import HeroSection from '@/components/shared/HeroSection';
import Image from 'next/image';

interface EventPageProps {
  title: string;
  description: string;
  logo?: string;
  children?: React.ReactNode;
}

const EventPage: React.FC<EventPageProps> = ({ title, description, logo, children }) => {
  return (
    <div>
      <HeroSection
        title={title}
        description={description}
      />
      <div className="container mx-auto px-4 py-16">
        {logo && (
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
              <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center">
                <Image 
                  src={logo} 
                  alt={`${title} Logo`} 
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        )}
        <h1 className="text-4xl font-bold text-center">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default EventPage;
