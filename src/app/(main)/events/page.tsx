import React from 'react';
import { getAllFrontMatter } from '@/lib/markdown';
import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import eventsData from '@/data/events.json';



const EventsPage: React.FC = () => {
  const allEvents = getAllFrontMatter("events").sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const now = new Date().setHours(0,0,0,0); // Get today's date at midnight for comparison

  const upcomingEvents = allEvents.filter(event => new Date(event.date).getTime() >= now).map(event => ({
    ...event,
    time: event.time || "N/A",
    location: event.location || "N/A",
    category: event.category || "all",
    attendees: event.attendees || 0,
    maxAttendees: event.maxAttendees || 0,
    speaker: event.speaker || "N/A",
    featured: event.featured || false,
    image: event.image || "",
    registrationOpen: event.registrationOpen || false,
    price: event.price || "Free",
    prerequisites: event.prerequisites || "N/A",
    materials: event.materials || [],
    formLink: event.formLink || "",
  }));

  const pastEvents = allEvents.filter(event => new Date(event.date).getTime() < now).map(event => ({
    ...event,
    time: event.time || "N/A",
    location: event.location || "N/A",
    category: event.category || "all",
    attendees: event.attendees || 0,
    maxAttendees: event.maxAttendees || 0,
    speaker: event.speaker || "N/A",
    featured: event.featured || false,
    image: event.image || "",
    registrationOpen: event.registrationOpen || false,
    price: event.price || "Free",
    prerequisites: event.prerequisites || "N/A",
    materials: event.materials || [],
    formLink: event.formLink || "",
  }));

  const getCategoryColor = (category: string) => {
    const cat = eventsData.categories.find(c => c.id === category);
    return cat ? cat.color : 'bg-[#6b8891]';
  };

  return (
    <div className="pt-16">
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
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className={`${getCategoryColor(event.category)} absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-medium capitalize`}>
                        {eventsData.categories.find(c => c.id === event.category)?.name}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#2f3033] mb-2">{event.title}</h3>
                      <p className="text-[#6b8891] text-sm mb-4 line-clamp-3">{event.description}</p>
                      <div className="flex items-center justify-between text-sm text-[#6b8891]">
                        <span>{format(new Date(event.date), 'MMM dd, yyyy')}</span>
                        <span>{event.location}</span>
                      </div>
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
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className={`${getCategoryColor(event.category)} absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-medium capitalize`}>
                        {eventsData.categories.find(c => c.id === event.category)?.name}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#2f3033] mb-2">{event.title}</h3>
                      <p className="text-[#6b8891] text-sm mb-4 line-clamp-3">{event.description}</p>
                      <div className="flex items-center justify-between text-sm text-[#6b8891]">
                        <span>{format(new Date(event.date), 'MMM dd, yyyy')}</span>
                        <span>{event.location}</span>
                      </div>
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
    </div>
  );
};

export default EventsPage;