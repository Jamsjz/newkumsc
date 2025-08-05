"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Award, Users2, BookOpen as BookOpen2, Target } from 'lucide-react';
import clubData from '@/data/clubInfo.json';

const QuickStats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: Award,
      value: clubData.stats.awards + '+ ',
      label: 'Awards Won',
      description: 'National & International recognitions',
      color: 'bg-[#ff8c42]'
    },
    {
      icon: Users2,
      value: clubData.stats.alumni + '+ ',
      label: 'Alumni Network',
      description: 'Graduates making impact worldwide',
      color: 'bg-[#ffd700]'
    },
    {
      icon: BookOpen2,
      value: clubData.stats.bismayaIssues + '',
      label: 'Bismaya Issues',
      description: 'Published mathematical magazine',
      color: 'bg-[#264653]'
    },
    {
      icon: Target,
      value: clubData.stats.successRate + '% ',
      label: 'Success Rate',
      description: 'Members achieving their goals',
      color: 'bg-[#c41e3a]'
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2f3033] mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-[#6b8891] max-w-2xl mx-auto">
            Building a legacy of mathematical excellence and community impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative bg-[#f4f1de] p-8 rounded-2xl hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`${stat.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              
              <div className="text-4xl font-bold text-[#2f3033] mb-2">
                {stat.value}
              </div>
              
              <div className="text-xl font-semibold text-[#4a6670] mb-2">
                {stat.label}
              </div>
              
              <div className="text-[#6b8891] text-sm leading-relaxed">
                {stat.description}
              </div>

              {/* Mathematical decoration */}
              <div className="absolute top-4 right-4 text-2xl text-[#6b8891]/20 font-light">
                {index === 0 && '∑'}
                {index === 1 && '∫'}
                {index === 2 && 'π'}
                {index === 3 && '∞'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickStats;
