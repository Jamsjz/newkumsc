import HeroSection from '@/components/shared/HeroSection';
import { BookOpen, Users, Trophy, Target, ArrowRight } from 'lucide-react';
import clubData from '@/data/clubInfo.json';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const OurStory: React.FC = () => {
  const iconMap = {
    BookOpen,
    Users,
    Trophy,
    Target
  };

  return (
    <div className="pt-16">
      <HeroSection
        title="Our Story"
        description="Eight years of mathematical excellence, community building, and inspiring the next generation of mathematicians at Kathmandu University."
      />

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2f3033] mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-[#6b8891] leading-relaxed mb-6">
                {clubData.clubInfo.mission}
              </p>
              <p className="text-lg text-[#6b8891] leading-relaxed">
                We strive to make mathematics accessible, engaging, and relevant to students while maintaining the highest standards of academic excellence and research integrity.
              </p>
            </div>
            <div className="bg-[#f4f1de] p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-[#2f3033] mb-4">Our Vision</h3>
              <p className="text-[#6b8891] leading-relaxed mb-4">
                {clubData.clubInfo.vision}
              </p>
              <div className="flex items-center space-x-2 text-[#ff8c42] font-semibold">
                <span>Shaping the future of mathematics</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-[#f4f1de]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2f3033] mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-[#6b8891] max-w-2xl mx-auto">
              Key milestones that shaped our club&apos;s growth and impact
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-1 bg-[#ff8c42] h-full hidden lg:block"></div>

            <div className="space-y-12">
              {clubData.milestones.map((milestone, index) => {
                const IconComponent = iconMap[milestone.icon as keyof typeof iconMap];
                return (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className={`${milestone.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div className="text-2xl font-bold text-[#ff8c42]">{milestone.year}</div>
                        </div>
                        <h3 className="text-xl font-bold text-[#2f3033] mb-2">{milestone.title}</h3>
                        <p className="text-[#6b8891] leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="hidden lg:flex w-2/12 justify-center">
                      <div className="w-4 h-4 bg-[#ff8c42] rounded-full border-4 border-white shadow-lg"></div>
                    </div>

                    <div className="hidden lg:block w-5/12"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2f3033] mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-[#6b8891] max-w-2xl mx-auto">
              The principles that guide our actions and decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clubData.values.map((value, index) => {
              const IconComponent = iconMap[value.icon as keyof typeof iconMap];
              return (
                <div key={index} className="text-center group">
                  <div className={`${value.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2f3033] mb-3">{value.title}</h3>
                  <p className="text-[#6b8891] leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Department Connection */}
      <section className="py-16 bg-[#f4f1de]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/images/Kathmandu_University.jpg"
                alt="Kathmandu University Campus"
                width={800}
                height={600}
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2f3033] mb-6">
                Connected to Excellence
              </h2>
              <p className="text-lg text-[#6b8891] leading-relaxed mb-6">
                As part of {clubData.clubInfo.university}&apos;s prestigious {clubData.clubInfo.department}, we benefit from world-class faculty, cutting-edge research opportunities, and a tradition of academic excellence that spans decades.
              </p>
              <p className="text-lg text-[#6b8891] leading-relaxed mb-6">
                Our club serves as a bridge between academic learning and practical application, providing students with opportunities to engage with mathematics beyond the classroom.
              </p>
              <Link href="/contact">
                <Button className="bg-[#264653] hover:bg-[#1b3640] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 group">
                  <span>Visit KU Mathematics Department</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
