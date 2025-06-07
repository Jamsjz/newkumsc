import Link from "next/link";
import { CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllFrontMatter, getRecentEvents } from "@/lib/markdown";
import { EventCalendar } from "@/components/features/events/EventCalendar";

export default function EventsPage() {
  const allEvents = getAllFrontMatter("events");
  const recentEvents = getRecentEvents("events", 5); // Get the 5 most recent events

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

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Left Column: Recent Events */}
        <div className="lg:col-span-1">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            Recent & Upcoming
          </h2>
          <div className="flex flex-col gap-4">
            {recentEvents.map((event) => (
              <Link href={`/events/${event.slug}`} key={event.slug}>
                <Card className="transition-all hover:shadow-md hover:border-primary">
                  <CardHeader>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 pt-1">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-2 md:p-6">
              <EventCalendar events={allEvents} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
