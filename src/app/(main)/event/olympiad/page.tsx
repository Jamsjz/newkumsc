"use client";
import React from 'react';
import EventPage from '@/components/features/events/EventPage';

const OlympiadPage: React.FC = () => {
  return (
    <EventPage
      title="Mathematics Olympiad"
      description="Showcase your mathematical skills and compete with the best."
    >
      <p className="text-lg text-center mt-4">Details about the Olympiad will be updated here soon.</p>
    </EventPage>
  );
};

export default OlympiadPage;