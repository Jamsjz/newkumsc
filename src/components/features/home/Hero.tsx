"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Users, Calendar } from 'lucide-react';
import clubData from '@/data/clubInfo.json';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const Hero: React.FC = () => {
  const [animatedStats, setAnimatedStats] = useState({
    members: 0,
    events: 0,
    projects: 0,
    years: 0
  });

  useEffect(() => {
    const targets = { 
      members: clubData.stats.members, 
      events: clubData.stats.events, 
      projects: clubData.stats.projects, 
      years: clubData.stats.years 
    };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    Object.keys(targets).forEach((key) => {
      const target = targets[key as keyof typeof targets];
      const increment = target / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        current += increment;
        step++;
        
        setAnimatedStats(prev => ({
          ...prev,
          [key]: Math.min(Math.floor(current), target)
        }));

        if (step >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2f3033] mb-6">
              Mathematics
              <span className="block text-[#ff8c42]">Club</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-[#4a6670]">
                {clubData.clubInfo.university}
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-[#454850] mb-8 leading-relaxed">
              {clubData.clubInfo.mission}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/contact">
                <Button className="bg-[#ff8c42] hover:bg-[#e67220] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Join Our Community
                </Button>
              </Link>
              <Link href="/events">
                <Button variant="outline" className="border-2 border-[#264653] text-[#264653] hover:bg-[#264653] hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
                  Explore Events
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="flex items-center justify-center w-12 h-12 bg-[#ff8c42] rounded-lg mb-4 mx-auto">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2f3033] mb-1">{animatedStats.members}+</div>
                  <div className="text-[#6b8891] font-medium">Active Members</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="flex items-center justify-center w-12 h-12 bg-[#ffd700] rounded-lg mb-4 mx-auto">
                  <Calendar className="h-6 w-6 text-[#2f3033]" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2f3033] mb-1">{animatedStats.events}+</div>
                  <div className="text-[#6b8891] font-medium">Events Hosted</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
