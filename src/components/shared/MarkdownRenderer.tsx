"use client";

import { MathJax } from "better-react-mathjax";

type MarkdownRendererProps = {
  htmlContent: string;
};

export default function MarkdownRenderer({
  htmlContent,
}: MarkdownRendererProps) {
  return (
    <MathJax hideUntilTypeset="first">
      <div
        className="prose prose-lg lg:prose-xl dark:prose-invert mx-auto"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </MathJax>
  );
}
