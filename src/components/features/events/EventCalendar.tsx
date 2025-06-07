// src/app/events/_components/EventCalendar.tsx

"use client";

import { format, isValid } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { type FrontMatter } from "@/lib/markdown";

type EventCalendarProps = {
  events: FrontMatter[];
};

/**
 * A robust helper function to safely parse various date string formats.
 * It uses `new Date()`, which is more lenient than other parsers.
 */
const safeParseDate = (dateStr: string | undefined | null): Date | null => {
  if (!dateStr || dateStr.trim() === "") return null;
  const date = new Date(dateStr);
  return isValid(date) ? date : null;
};

export function EventCalendar({ events }: EventCalendarProps) {
  // This logic is still necessary and robust. It creates a fast lookup
  // set of all valid dates from your events data.
  const eventDateSet = new Set(
    events
      .map((event) => safeParseDate(event.date))
      .filter((date): date is Date => date !== null)
      .map((date) => format(date, "yyyy-MM-dd")),
  );

  return (
    <Calendar
      mode="single"
      className="w-full"
      // The `modifiers` and `modifiersStyles` props are the correct way
      // to style specific days.
      modifiers={{
        eventDay: (date) => eventDateSet.has(format(date, "yyyy-MM-dd")),
      }}
      modifiersStyles={{
        eventDay: {
          fontWeight: "bold",
          border: "2px solid hsl(var(--primary))",
          borderRadius: "50%",
        },
      }}
    />
  );
}
