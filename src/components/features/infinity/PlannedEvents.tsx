"use client";
import React from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

const events = [
  { name: 'Mathematical Games', status: 'confirmed' },
  { name: 'High School Workshop', status: 'confirmed' },
  { name: 'Undergraduate Workshop', status: 'confirmed' },
  { name: 'Quiz', status: 'tentative' },
  { name: 'E-games', status: 'confirmed' },
  { name: 'Olympiad', status: 'confirmed' },
  { name: 'Integration Bee', status: 'confirmed' },
  { name: 'Talk Show', status: 'confirmed' },
  { name: 'Data Visualization Competition', status: 'confirmed' },
  { name: 'Hackathon', status: 'confirmed' },
  { name: 'Meme Competitions', status: 'confirmed' },
  { name: 'Acoustic Night', status: 'confirmed' },
  { name: 'Photography Competitions', status: 'confirmed' },
  { name: 'AI Art Challenge', status: 'confirmed' },
  { name: 'Mathematical Modeling', status: 'confirmed' },
  { name: 'Main Day (Inauguration, Speech, Certificate), Stalls, Live Art', status: 'confirmed' },
  { name: 'Suggest an Event!', status: 'suggestion' },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'confirmed':
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    case 'tentative':
      return <HelpCircle className="h-6 w-6 text-yellow-500" />;
    case 'suggestion':
      return <XCircle className="h-6 w-6 text-blue-500" />;
    default:
      return null;
  }
};

const PlannedEvents: React.FC = () => {
  return (
    <section className="py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Planned Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div key={index} className="flex items-center p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-300">
              <div className="mr-4">{getStatusIcon(event.status)}</div>
              <h3 className="text-lg font-medium">{event.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlannedEvents;
