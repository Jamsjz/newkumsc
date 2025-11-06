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
    <section className="py-20 bg-white text-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Event Highlights</h2>
        <p className="text-lg text-center my-4">Welcome to Infinity, our annual flagship event. Join us for a series of exciting events, workshops, and competitions.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <Card key={index} className="bg-gray-100 border-gray-300 shadow-lg hover:shadow-yellow-400/20 transform hover:-translate-y-2 transition-all duration-300">
              <CardHeader className="flex flex-col items-center text-center">
                {highlight.icon}
                <CardTitle className="mt-4 text-2xl font-bold text-gray-800">{highlight.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
