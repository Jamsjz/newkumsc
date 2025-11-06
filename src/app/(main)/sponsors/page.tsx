"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building, Users, Award, ChevronRight, Globe, Mail, Phone, Handshake } from 'lucide-react';
import HeroSection from '@/components/shared/HeroSection';
import sponsorsData from '@/data/sponsors.json';
import { Sponsor } from '@/lib/data';
import PieChart from '@/components/shared/PieChart';



const Sponsors: React.FC = () => {
  const currentSponsors: Sponsor[] = sponsorsData.sponsors;
  const sponsorshipTiers = sponsorsData.tiers;
  const allocationData =  [
    { label: "Major Events", value: 30, color: "#6666ff" },
    { label: "Educational Programs", value: 25, color: "#33ccff" },
    { label: "Conference & Research", value: 15, color: "#fff380" },
    { label: "Community Outreach", value: 10, color: "#ffb266" },
    { label: "Club Development", value: 10, color: "#ff6666" },
    { label: "Promotional Materials", value: 5, color: "#66a3ff" },
    { label: "Administrative", value: 5, color: "#99d8d0" },
  ];
  return (
    <div className="">
      <HeroSection
        title="Partner with Excellence"
        description="Support mathematical innovation and connect with Nepal's brightest mathematics talent"
      />

      {/* Current Sponsors Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#2f3033] mb-12">Our Current Sponsors</h2>
          
          {currentSponsors.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {currentSponsors.map((sponsor) => (
                <div key={sponsor.id} className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex justify-center mb-6">
                    <Image 
                      src={sponsor.logo} 
                      alt={`${sponsor.name} logo`} 
                      width={150}
                      height={80}
                      className="h-16 object-contain" 
                    />
                  </div>
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-[#2f3033]">{sponsor.name}</h3>
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full capitalize mt-2 ${
                      sponsor.tier === 'platinum' ? 'bg-gray-200 text-gray-800' :
                      sponsor.tier === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                      sponsor.tier === 'silver' ? 'bg-gray-100 text-gray-700' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {sponsor.tier} Sponsor
                    </span>
                  </div>
                  <p className="text-[#4a6670] text-center mb-4">{sponsor.description}</p>
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
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-[#6b8891] mb-4">We are currently seeking sponsors to support our initiatives.</p>
              <Link
                href="/sponsors#join-sponsor"
                className="inline-block px-6 py-3 bg-[#ff8c42] text-white font-medium rounded-lg hover:bg-[#e67220] transition-colors"
              >
                Become a Sponsor
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="py-16 bg-[#f4f1de]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-[#2f3033] mb-4" id="sponsor-opp">Sponsorship Opportunities</h2>
            <p className="text-lg text-[#4a6670]">
              We offer various levels of sponsorship to fit your organization&apos;s goals and budget. 
              Each tier provides unique benefits and opportunities to connect with our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsorshipTiers.map((tier, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`${tier.color} p-6 ${tier.name === 'Platinum' ? 'glass-morphism' : ''} ${tier.name === 'Gold' ? 'shining-gold' : ''} ${tier.name === 'Silver' ? 'shining-silver' : ''}`}>
                  <h3 className={`text-2xl font-bold ${tier.textColor}`}>{tier.name}</h3>
                  <div className={`text-lg font-medium mt-1 ${tier.textColor}`}>{tier.price}</div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <Award size={18} className="text-[#ff8c42] mt-1 mr-2 flex-shrink-0" />
                        <span className="text-[#4a6670]">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact#contact-form"
              className="inline-block px-6 py-3 bg-[#ff8c42] text-white font-medium rounded-lg hover:bg-[#e67220] transition-colors"
            >
              Inquire About Sponsorship
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsorship Impact */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#2f3033] mb-6">Why Sponsor Us?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Users className="h-6 w-6 text-[#ff8c42]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2f3033] mb-2">Talent Recruitment</h3>
                    <p className="text-[#4a6670]">
                      Connect with 500+ mathematically talented students for future recruitment opportunities.
                      Our members excel in problem-solving, data analysis, and critical thinking.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Building className="h-6 w-6 text-[#ff8c42]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2f3033] mb-2">Brand Visibility</h3>
                    <p className="text-[#4a6670]">
                      Showcase your brand to an engaged audience of students, faculty, and professionals 
                      across multiple channels including events, digital platforms, and publications.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Globe className="h-6 w-6 text-[#ff8c42]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2f3033] mb-2">Community Impact</h3>
                    <p className="text-[#4a6670]">
                      Support mathematical education and innovation in Nepal. Your sponsorship 
                      directly enables opportunities for students to learn, compete, and grow.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Handshake className="h-6 w-6 text-[#ff8c42]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2f3033] mb-2">Research Collaboration</h3>
                    <p className="text-[#4a6670]">
                      Access to collaborative opportunities with faculty and students on 
                      mathematical research projects relevant to your industry.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#f4f1de] rounded-xl p-8 items-center min-h-[300px]">
              <h3 className="text-2xl font-bold text-[#2f3033] mb-6">Your Sponsorship Allocation</h3>
							<PieChart data={allocationData} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#2f3033] to-[#264653] text-white" id="join-sponsor">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Become a Sponsor?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our community of partners and make a lasting impact on mathematical education 
              and innovation at Kathmandu University.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact#contact-form"
                className="px-6 py-3 bg-[#ff8c42] text-white font-medium rounded-lg hover:bg-[#e67220] transition-colors"
              >
                Become a Sponsor
              </Link>
              <a
                href="mailto:sponsorship@kumathsclub.edu.np"
                className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Contact Sponsorship Team
              </a>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-8">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-[#ff8c42]" />
                <span>kumsc@ku.edu.np</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-[#ff8c42]" />
                <span>+977 9823644469</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sponsors;
