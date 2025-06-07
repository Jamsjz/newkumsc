"use client"; // This directive is the key to making it a Client Component

import dynamic from "next/dynamic";

// Perform the dynamic import inside the Client Component
const DynamicMarkdownRenderer = dynamic(
  () => import("./MarkdownRenderer"), // Assuming MarkdownRenderer is in the same folder
  {
    ssr: false,
    loading: () => (
      <div className="prose lg:prose-xl dark:prose-invert mx-auto">
        Loading Content...
      </div>
    ),
  },
);

// This simple wrapper component just passes the props through to the
// dynamically loaded component.
export default function ClientMarkdownRenderer({
  htmlContent,
}: {
  htmlContent: string;
}) {
  return <DynamicMarkdownRenderer htmlContent={htmlContent} />;
}
