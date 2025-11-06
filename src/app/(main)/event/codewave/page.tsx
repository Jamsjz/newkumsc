"use client";
import React from 'react';
import EventPage from '@/components/features/events/EventPage';

const CodewavePage: React.FC = () => {
  return (
    <EventPage
      title="Codewave"
      description="Description for Codewave page."
    >
      <p className="text-lg text-center mt-4">Details about Codewave will be updated here soon.</p>
    </EventPage>
  );
};

export default CodewavePage;