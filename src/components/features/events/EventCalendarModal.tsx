"use client";

import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EventCalendar } from "./EventCalendar";
import { type FrontMatter } from "@/lib/markdown";

interface EventCalendarModalProps {
  events: FrontMatter[];
}

const EventCalendarModal: React.FC<EventCalendarModalProps> = ({ events }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          View Calendar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Event Calendar</DialogTitle>
          <DialogDescription>
            Browse events by date and see details on hover.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <EventCalendar events={events} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventCalendarModal;
