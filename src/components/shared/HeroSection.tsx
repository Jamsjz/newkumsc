import React from 'react';

interface HeroSectionProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, description, children }) => {
  return (
    <section className="bg-gradient-to-br from-[#2f3033] to-[#264653] text-white py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {title}
          </h1>
          <p className="text-xl sm:text-2xl text-[#6b8891] leading-relaxed">
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
