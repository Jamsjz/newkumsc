"use client";
import React, { useState, useMemo } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import eventsData from '@/data/events.json';
import EventCalendarModal from '@/components/features/events/EventCalendarModal';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FrontMatter } from '@/lib/markdown';

import EventDate from './EventDate';

interface EventsClientProps {
  initialEvents: FrontMatter[];
}

const EventsClient: React.FC<EventsClientProps> = ({ initialEvents }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const initialCategory = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('category') || 'all' : 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedTag, setSelectedTag] = useState('all');

  const getCategoryColor = (category: string) => {
    const cat = eventsData.categories.find(c => c.id === category);
    return cat ? cat.color : 'bg-[#6b8891]';
  };

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    initialEvents.forEach(event => {
      if (event.category) categories.add(event.category);
    });
    return ['all', ...Array.from(categories)];
  }, [initialEvents]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialEvents.forEach(event => {
      if (event.tags) {
        event.tags.forEach(tag => tags.add(tag));
      }
    });
    return ['all', ...Array.from(tags)];
  }, [initialEvents]);

  const filteredEvents = useMemo(() => {
    return initialEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      const matchesTag = selectedTag === 'all' || (event.tags && event.tags.includes(selectedTag));
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [initialEvents, searchQuery, selectedCategory, selectedTag]);

  const now = new Date().setHours(0,0,0,0);
  const upcomingEvents = filteredEvents.filter(event => {
    const eventEndDate = event.to ? new Date(event.to) : new Date(event.date);
    return eventEndDate.getTime() >= now;
  });
  const pastEvents = filteredEvents.filter(event => {
    const eventEndDate = event.to ? new Date(event.to) : new Date(event.date);
    return eventEndDate.getTime() < now;
  });

  return (
    <React.Fragment>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2f3033] to-[#264653] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Events
            </h1>
            <p className="text-xl sm:text-2xl text-[#6b8891] leading-relaxed">
              Explore our upcoming and past events, workshops, and competitions.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <EventCalendarModal events={initialEvents} />
              <Link href="/contact">
                <Button className="flex items-center gap-2 bg-[#ff8c42] hover:bg-[#e67220]">
                  <Mail className="h-5 w-5" />
                  Suggest an Event
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <Input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/3"
            />
            <Select onValueChange={setSelectedCategory} value={selectedCategory}>
              <SelectTrigger className="w-full md:w-1/4">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                {allCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setSelectedTag} value={selectedTag}>
              <SelectTrigger className="w-full md:w-1/4">
                <SelectValue placeholder="Filter by Tag" />
              </SelectTrigger>
              <SelectContent>
                {allTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag === 'all' ? 'All Tags' : tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2f3033] mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-[#6b8891] max-w-2xl mx-auto">
              Don&apos;t miss out on our exciting future events!
            </p>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <Link href={`/events/${event.slug}`} key={event.slug}>
                  <div className="bg-[#f4f1de] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                    {event.image && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {event.category && (
                      <div className={`${getCategoryColor(event.category)} absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-medium capitalize`}>
                        {eventsData.categories.find(c => c.id === event.category)?.name}
                      </div>
                      )}
                    </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#2f3033] mb-2">{event.title}</h3>
                      <p className="text-[#6b8891] text-sm mb-4 line-clamp-3">{event.description}</p>
                      <div className="flex items-center justify-between text-sm text-[#6b8891]">
                        <EventDate event={event} />
                        <span>{event.location}</span>
                      </div>
                      {event.form && new Date(event.to || event.date).getTime() >= new Date().setHours(0,0,0,0) && (
                        <div className="mt-4">
                          <Button asChild size="sm" className="w-full bg-[#ff8c42] hover:bg-[#e67220] text-white">
                            <Link href={event.form} target="_blank" rel="noopener noreferrer">
                              Register Now
                            </Link>
                          </Button>
                        </div>
                      )}
                      {event.tags && event.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {event.tags.map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-[#6b8891]">No upcoming events at the moment. Check back soon!</p>
          )}
        </div>
      </section>

      {/* Past Events Section */}
      <section className="py-16 bg-[#f4f1de]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2f3033] mb-4">
              Past Events
            </h2>
            <p className="text-lg text-[#6b8891] max-w-2xl mx-auto">
              A look back at our memorable events and achievements.
            </p>
          </div>

          {pastEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <Link href={`/events/${event.slug}`} key={event.slug}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                    {event.image && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {event.category && (
                      <div className={`${getCategoryColor(event.category)} absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-medium capitalize`}>
                        {eventsData.categories.find(c => c.id === event.category)?.name}
                      </div>
                      )}
                    </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#2f3033] mb-2">{event.title}</h3>
                      <p className="text-[#6b8891] text-sm mb-4 line-clamp-3">{event.description}</p>
                      <div className="flex items-center justify-between text-sm text-[#6b8891]">
                        <EventDate event={event} />
                        <span>{event.location}</span>
                      </div>
                      {event.form && new Date(event.to || event.date).getTime() >= new Date().setHours(0,0,0,0) && (
                        <div className="mt-4">
                          <Button asChild size="sm" className="w-full bg-[#ff8c42] hover:bg-[#e67220] text-white">
                            <Link href={event.form} target="_blank" rel="noopener noreferrer">
                              Register Now
                            </Link>
                          </Button>
                        </div>
                      )}
                      {event.tags && event.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {event.tags.map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-[#6b8891]">No past events to display.</p>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

export default EventsClient;