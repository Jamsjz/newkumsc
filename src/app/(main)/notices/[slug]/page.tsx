import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

import { getSinglePost, getAllFrontMatter } from "@/lib/markdown";
import ClientMarkdownRenderer from "@/components/shared/ClientMarkdownRenderer";

// Standardized PageProps type using your specific fix
type PageProps = {
  params: Promise<{ slug: string }>;
};

// Generate static pages at build time
export async function generateStaticParams() {
  const notices = getAllFrontMatter("notices");
  return notices.map((notice) => ({
    slug: notice.slug,
  }));
}

// Generate metadata for SEO using the corrected PageProps
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params; // Await params as required by the type
  const post = getSinglePost("notices", slug);
  return {
    title: post?.fm.title || "Notice Not Found",
    description: post?.fm.description || "An announcement from KUMSC.",
  };
}

export default async function SingleNoticePage({ params }: PageProps) {
  const { slug } = await params; // Await params as required by the type
  const post = getSinglePost("notices", slug);

  if (!post) {
    notFound();
  }

  const htmlContent = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(post.content);

  return (
    <main className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 md:px-8">
      <article>
        {post.fm.image && (
          <div className="mb-12">
            <div className="relative aspect-[16/8] w-full overflow-hidden rounded-xl">
              <Image
                src={post.fm.image as string}
                alt={`${post.fm.title} banner`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        )}

        <header className="mb-8 text-center">
          <h1 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            {post.fm.title}
          </h1>
          <div className="mt-4 flex justify-center items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>
              {new Date(post.fm.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </header>

        <ClientMarkdownRenderer htmlContent={htmlContent.toString()} />
      </article>
    </main>
  );
}
