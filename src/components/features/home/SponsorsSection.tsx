import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import sponsorsData from '@/data/sponsors.json';
import Image from 'next/image';

interface SponsorsSectionProps {
  eventSpecific?: boolean;
  eventName?: string;
  showTitle?: boolean;
  compact?: boolean;
  tierFilter?: string[];
}

const SponsorsSection: React.FC<SponsorsSectionProps> = ({
  eventSpecific = false,
  eventName = '',
  showTitle = true,
  compact = false,
  tierFilter = ['platinum', 'gold', 'silver', 'bronze']
}) => {
  // Filter sponsors based on tier
  const filteredSponsors = sponsorsData.sponsors.filter(
    (sponsor) => tierFilter.includes(sponsor.tier)
  );

  return (
    <section className={`py-12 ${compact ? 'bg-white' : 'bg-[#f4f1de]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-[#2f3033]">
              {eventSpecific ? `${eventName} Sponsors` : 'Our Sponsors'}
            </h2>
            {eventSpecific && (
              <p className="mt-3 text-lg text-[#4a6670]">
                Organizations making {eventName} possible through their generous support
              </p>
            )}
          </div>
        )}

        <div className={`grid gap-6 ${compact ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6' : 'md:grid-cols-3'}`}>
          {filteredSponsors.map((sponsor) => (
            <div 
              key={sponsor.id} 
              className={`${compact ? 'flex justify-center items-center p-4' : 'border border-gray-200 p-6'} bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300`}
            >
              {compact ? (
                <Image 
                  src={sponsor.logo} 
                  alt={`${sponsor.name} logo`} 
                  width={150}
                  height={80}
                  className="h-12 object-contain" 
                />
              ) : (
                <>
                  <div className="flex justify-center mb-4">
                    <Image 
                      src={sponsor.logo} 
                      alt={`${sponsor.name} logo`} 
                      width={150}
                      height={80}
                      className="h-16 object-contain" 
                    />
                  </div>
                  <div className="text-center mb-3">
                    <h3 className="text-lg font-bold text-[#2f3033]">{sponsor.name}</h3>
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full capitalize mt-2 ${
                      sponsor.tier === 'platinum' ? 'bg-gray-200 text-gray-800' :
                      sponsor.tier === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                      sponsor.tier === 'silver' ? 'bg-gray-100 text-gray-700' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {sponsor.tier} Sponsor
                    </span>
                  </div>
                  {!compact && <p className="text-sm text-[#4a6670] text-center mb-4">{sponsor.description}</p>}
                  <div className="text-center">
                    <a 
                      href={sponsor.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#264653] hover:text-[#4a6670] transition-colors"
                    >
                      Visit Website <ChevronRight size={16} className="ml-1" />
                    </a>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {!eventSpecific && (
          <div className="mt-8 text-center">
            <Link
              href="/sponsors"
              className="inline-flex items-center text-[#264653] font-medium hover:text-[#4a6670] transition-colors"
            >
              View All Sponsors <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        )}
        
        {eventSpecific && (
          <div className="mt-8 text-center">
            <Link
              href="/sponsors"
              className="inline-block px-6 py-3 bg-[#ff8c42] text-white font-medium rounded-lg hover:bg-[#e67220] transition-colors"
            >
              Become a Sponsor
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default SponsorsSection;
