// src/components/features/events/EventCalendar.tsx

"use client";

import React from "react";
import Link from "next/link";
import { format, isValid } from "date-fns";
import { Day, DayProps } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { type FrontMatter } from "@/lib/markdown";

type EventCalendarProps = {
  events: FrontMatter[];
};

// Helper function to safely parse various date string formats.
const safeParseDate = (dateStr: string | undefined | null): Date | null => {
  if (!dateStr || dateStr.trim() === "") return null;
  const date = new Date(dateStr);
  return isValid(date) ? date : null;
};

export function EventCalendar({ events }: EventCalendarProps) {
  // Use useMemo to pre-process events into a Map for high performance.
  const eventsByDate = React.useMemo(() => {
    const map = new Map<string, FrontMatter[]>();
    events.forEach((event) => {
      const date = safeParseDate(event.date as string);
      if (date) {
        const dateString = format(date, "yyyy-MM-dd");
        if (!map.has(dateString)) {
          map.set(dateString, []);
        }
        map.get(dateString)?.push(event);
      }
    });
    return map;
  }, [events]);

  // A custom Day component that wraps event days with a HoverCard.
  function DayWithHoverCard(props: DayProps) {
    const dateString = format(props.day.date, "yyyy-MM-dd");
    const eventsOnThisDay = eventsByDate.get(dateString);

    if (!eventsOnThisDay) {
      return <Day {...props} />;
    }

    return (
      <HoverCard openDelay={100} closeDelay={50}>
        <HoverCardTrigger asChild>
          <Day {...props} />
        </HoverCardTrigger>
        <HoverCardContent className="w-80" side="top" align="center">
          <div className="flex flex-col gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">
                Events on {format(props.day.date, "MMMM d, yyyy")}
              </h4>
              <p className="text-sm text-muted-foreground">
                Click an event to see more details.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {eventsOnThisDay.map((event) => (
                <Button
                  key={event.slug}
                  variant="link"
                  className="p-0 justify-start h-auto text-left whitespace-normal"
                  asChild
                >
                  <Link href={`/events/${event.slug}`}>{event.title}</Link>
                </Button>
              ))}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }

  return (
    // --- FIX: Responsive Wrapper ---
    // This div controls the calendar's size on small screens by adjusting font size.
    <div className="w-full text-sm sm:text-base">
      <Calendar
        mode="single"
        className="w-full"
        components={{
          Day: DayWithHoverCard,
        }}
        modifiers={{
          eventDay: (date) => eventsByDate.has(format(date, "yyyy-MM-dd")),
        }}
        // --- FIX: Correctly applied styling ---
        modifiersClassNames={{
          eventDay:
            "bg-green-300 text-green-950 rounded-full !hover:bg-green-200 focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2",
        }}
      />
    </div>
  );
}
