import React from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  description: string;
  logo?: string;
  children?: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, description, logo, children }) => {
  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          {logo && (
            <div className="flex justify-center mb-8">
              <div className="relative w-90 h-90">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center">
                  <Image 
                    src={logo} 
                    alt={title ? `${title} Logo` : 'Hero Logo'} 
                    width={300}
                    height={300}
                  />
                </div>
              </div>
            </div>
          )}
          <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed">
            {description}
          </p>
          {children && (
            <div className="mt-6 flex justify-center gap-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
