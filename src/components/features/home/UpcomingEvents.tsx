"use client";

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import eventsData from '@/data/events.json';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface EventItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  maxAttendees: number;
  speaker: string;
  featured: boolean;
  image: string;
  registrationOpen: boolean;
  price: string;
  prerequisites: string;
  materials: string[];
  formLink?: string;
}

type UpcomingEventsProps = {
  events: EventItem[];
};

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  const [activeEvent, setActiveEvent] = useState(0);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTimeUntil = (dateString: string) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return `${diffDays} days to go`;
    } else if (diffDays === 0) {
      return 'Today';
    } else {
      return 'Past Event';
    }
  };

  const getCategoryColor = (category: string) => {
    const cat = eventsData.categories.find(c => c.id === category);
    return cat ? cat.color : 'bg-[#6b8891]';
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-[#6b8891]">No upcoming events at the moment. Check back soon!</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-[#f4f1de]" id="upcoming-events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2f3033] mb-4">
            What&apos;s Coming Up
          </h2>
          <p className="text-lg text-[#6b8891] max-w-2xl mx-auto">
            Join us for exciting mathematical events, workshops, and competitions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Event */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className={`${getCategoryColor(events[activeEvent].category)} h-2`}></div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-[#f4f1de] text-[#2f3033] rounded-full text-sm font-medium">
                    {eventsData.categories.find(c => c.id === events[activeEvent].category)?.name}
                  </span>
                  <span className="text-[#ff8c42] font-semibold text-sm">
                    {getTimeUntil(events[activeEvent].date)}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#2f3033] mb-4">
                  {events[activeEvent].title}
                </h3>

                <p className="text-[#6b8891] text-lg mb-6 leading-relaxed">
                  {events[activeEvent].description}
                </p>

                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-[#ff8c42]" />
                    <div>
                      <div className="text-sm text-[#6b8891]">Date</div>
                      <div className="font-semibold text-[#2f3033]">
                        {formatDate(events[activeEvent].date)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-[#ff8c42]" />
                    <div>
                      <div className="text-sm text-[#6b8891]">Time</div>
                      <div className="font-semibold text-[#2f3033]">
                        {events[activeEvent].time}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-[#ff8c42]" />
                    <div>
                      <div className="text-sm text-[#6b8891]">Location</div>
                      <div className="font-semibold text-[#2f3033]">
                        {events[activeEvent].location}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-[#6b8891]" />
                    <span className="text-[#6b8891]">
                      {events[activeEvent].attendees}/{events[activeEvent].maxAttendees} attendees
                    </span>
                  </div>

                  <Button asChild className="bg-[#ff8c42] hover:bg-[#e67220] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 group">
                    <Link href={events[activeEvent].formLink || "/contact"}>
                      <span>Register Now</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Event List */}
          <div className="space-y-4">
            {events.map((event, index) => (
              <div
                key={event.slug}
                onClick={() => setActiveEvent(index)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                  activeEvent === index
                    ? 'bg-white shadow-md'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activeEvent === index ? 'bg-[#ff8c42] text-white' : 'bg-[#f4f1de] text-[#2f3033]'
                  }`}>
                    {eventsData.categories.find(c => c.id === event.category)?.name}
                  </span>
                  <span className="text-xs text-[#6b8891]">
                    {getTimeUntil(event.date)}
                  </span>
                </div>

                <h4 className="font-semibold text-[#2f3033] mb-2 line-clamp-2">
                  {event.title}
                </h4>

                <div className="flex items-center space-x-4 text-xs text-[#6b8891]">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            ))}

            <Link href="/events">
              <Button className="w-full mt-4 text-[#264653] hover:text-[#ff8c42] font-semibold py-2 transition-colors duration-200 flex items-center justify-center space-x-2 group">
                <span>View All Events</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
