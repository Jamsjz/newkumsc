import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

import { getSinglePost, getAllFrontMatter } from "@/lib/markdown";
import ClientMarkdownRenderer from "@/components/shared/ClientMarkdownRenderer";

// Standardized PageProps type for dynamic routes
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const events = getAllFrontMatter("events");
  return events.map((event) => ({
    slug: event.slug,
  }));
}

// Use the standardized PageProps type
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params; // Await params as the build requires it
  const post = getSinglePost("events", slug);
  return {
    title: post?.fm.title || "Event Not Found",
    description: post?.fm.description || "",
  };
}

// Use the standardized PageProps type
export default async function SingleEventPage({ params }: PageProps) {
  const { slug } = await params; // Await params as the build requires it
  const post = getSinglePost("events", slug);

  if (!post) {
    notFound();
  }

  const isFutureEvent = new Date(post.fm.date).getTime() >= new Date().setHours(0,0,0,0);

  const htmlContent = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(post.content);

  return (
    <main className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 md:px-8">
      <header className="mb-8">
        <h1 className="text-balance text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          {post.fm.title}
        </h1>
        <div className="mt-4 flex justify-center items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>
              {post.fm.from && post.fm.to
                ? `${new Date(post.fm.from).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })} - ${new Date(post.fm.to).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}`
                : new Date(post.fm.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
            </span>
          </div>
          {post.fm.time && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.fm.time}</span>
            </div>
          )}
          {post.fm.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{post.fm.location}</span>
            </div>
          )}
          {post.fm.attendees && post.fm.maxAttendees && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{post.fm.attendees}/{post.fm.maxAttendees} attendees</span>
            </div>
          )}
        </div>
        {isFutureEvent && post.fm.form && (
          <div className="mt-8 text-center">
            <Button asChild size="lg" className="bg-[#ff8c42] hover:bg-[#e67220] text-white">
              <Link href={post.fm.form} target="_blank" rel="noopener noreferrer">
                Register Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </header>

      <article>
        {post.fm.image && (
          <div className="mb-12">
            <div className="relative aspect-[16/8] w-full overflow-hidden rounded-xl">
              <Image
                src={post.fm.image}
                alt={`${post.fm.title} banner`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        )}
        <ClientMarkdownRenderer htmlContent={htmlContent.toString()} />
      </article>
    </main>
  );
}
