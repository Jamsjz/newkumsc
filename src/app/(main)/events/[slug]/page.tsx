import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

import { getSinglePost, getAllFrontMatter } from "@/lib/markdown";
import { Badge } from "@/components/ui/badge";

// Generate static pages at build time
export async function generateStaticParams() {
  const events = getAllFrontMatter("events");
  return events.map((event) => ({
    slug: event.slug,
  }));
}

// Generate metadata for the page (good for SEO)
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = getSinglePost("events", params.slug);
  return {
    title: post?.fm.title || "Event Not Found",
    description: post?.fm.description || "",
  };
}

export default async function SingleEventPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getSinglePost("events", params.slug);

  if (!post) {
    notFound(); // Redirect to 404 page if post doesn't exist
  }

  // Convert markdown content to HTML
  const htmlContent = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(post.content);

  return (
    <main className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 md:px-8">
      <article>
        <header className="mb-8">
          <h1 className="text-balance text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            {post.fm.title}
          </h1>
          <div className="mt-4 flex justify-center items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>
                {new Date(post.fm.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Render the HTML content with prose styling */}
        <div
          className="prose prose-lg lg:prose-xl dark:prose-invert mx-auto"
          dangerouslySetInnerHTML={{ __html: htmlContent.toString() }}
        />
      </article>
    </main>
  );
}
