import Link from "next/link";
import { CalendarDays } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllFrontMatter } from "@/lib/markdown";

export const metadata = {
  title: "Notices",
  description: "Official announcements and updates from the KUMSC.",
};

export default function NoticesPage() {
  const notices = getAllFrontMatter("notices");

  return (
    <main className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 md:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Notices & Announcements
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Stay informed with the latest news and updates from the club.
        </p>
      </div>

      {notices.length > 0 ? (
        <div className="flex flex-col gap-6">
          {notices.map((notice) => (
            <Link href={`/notices/${notice.slug}`} key={notice.slug}>
              <Card className="transition-all hover:shadow-lg hover:border-primary">
                <CardHeader>
                  <CardTitle className="text-xl">{notice.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 pt-2">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(notice.date).toLocaleDateString("en-US", {
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
      ) : (
        <p className="text-center text-muted-foreground">
          No notices found. Please check back later.
        </p>
      )}
    </main>
  );
}
