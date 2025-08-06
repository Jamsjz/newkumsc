"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Notice {
  slug: string;
  title: string;
  date: string;
  description: string;
}

type NoticeModalProps = {
  notices: Notice[];
};

const NoticeModal: React.FC<NoticeModalProps> = ({ notices }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has visited before
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      setIsOpen(true);

      // Set flag in localStorage
      sessionStorage.setItem("hasVisited", "true");
    }
  }, []);

  if (notices.length === 0) {
    return null; // Don't render modal if no notices
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Recent Notices</DialogTitle>
          <DialogDescription>
            Stay updated with the latest announcements from KUMSC.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {notices.map((notice) => (
            <div key={notice.slug} className="flex flex-col space-y-1">
              <Link href={`/notices/${notice.slug}`} onClick={() => setIsOpen(false)} className="text-lg font-semibold hover:underline">
                {notice.title}
              </Link>
              <p className="text-sm text-muted-foreground">
                {format(new Date(notice.date), "MMMM d, yyyy")}
              </p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {notice.description}
              </p>
            </div>
          ))}
        </div>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default NoticeModal;