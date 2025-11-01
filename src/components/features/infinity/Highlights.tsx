"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Gamepad2, BrainCircuit } from 'lucide-react';

const highlights = [
  {
    title: 'Hackathon',
    description: 'A 24-hour coding marathon to build innovative solutions.',
    icon: <Zap className="h-12 w-12 text-yellow-400" />,
  },
  {
    title: 'Mathematical Games',
    description: 'Engage in fun and challenging mathematical games and puzzles.',
    icon: <Gamepad2 className="h-12 w-12 text-green-400" />,
  },
  {
    title: 'Olympiad',
    description: 'Compete with the brightest minds in a prestigious math competition.',
    icon: <BrainCircuit className="h-12 w-12 text-blue-400" />,
  },
];

const Highlights: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Event Highlights</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-yellow-400/20 transform hover:-translate-y-2 transition-all duration-300">
              <CardHeader className="flex flex-col items-center text-center">
                {highlight.icon}
                <CardTitle className="mt-4 text-2xl font-bold">{highlight.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-400">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
