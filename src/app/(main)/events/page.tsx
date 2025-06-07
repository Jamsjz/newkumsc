import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  getAllFrontMatter,
  getRecentEvents,
  FrontMatter, // Ensure this is exported from lib/markdown
} from "@/lib/markdown";
import { EventCalendar } from "@/components/features/events/EventCalendar";

/**
 * A redesigned card to display a single event with an image and description,
 * inspired by the layout of the committee members page.
 */
function EventCard({ event }: { event: FrontMatter }) {
  return (
    <Link href={`/events/${event.slug}`} passHref>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-primary">
        {/* The CardContent is wrapped in a grid to create the side-by-side layout */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Image Column */}
          <div className="relative aspect-video md:aspect-square">
            {event.image ? (
              <Image
                src={event.image}
                alt={`${event.title} banner`}
                fill
                className="object-cover"
              />
            ) : (
              // Fallback UI if no image is provided in the front matter
              <div className="flex h-full items-center justify-center bg-muted">
                <CalendarDays className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
          </div>
          {/* Content Column */}
          <div className="flex flex-col justify-center p-4 md:col-span-2">
            <CardTitle className="text-xl leading-tight">
              {event.title}
            </CardTitle>
            <CardDescription className="mt-2 flex items-center gap-2 text-sm">
              <CalendarDays className="h-4 w-4" />
              {new Date(event.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
            {/* Show a short description if available, clamping it to 2 lines */}
            {event.description && (
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                {event.description}
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default function EventsPage() {
  const allEvents = getAllFrontMatter("events");
  const recentEvents = getRecentEvents("events", 5);

  return (
    <main className="container mx-auto px-4 py-12 sm:px-6 md:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Club Events
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Stay updated with our workshops, competitions, and meetups.
        </p>
      </div>

      {/* Main layout grid is now 5 columns wide on large screens */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        {/* Right Column (Desktop) / Top Section (Mobile) */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            Event Calendar
          </h2>
          <Card>
            <CardContent className="flex justify-center p-2 md:p-4">
              <EventCalendar events={allEvents} />
            </CardContent>
          </Card>
        </div>

        {/* Left Column (Desktop) / Bottom Section (Mobile) */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            Recent & Upcoming
          </h2>
          <div className="flex flex-col gap-6">
            {recentEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
