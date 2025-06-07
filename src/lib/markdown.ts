import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type FrontMatter = {
  title: string;
  date: string;
  slug: string;
  [key: string]: any;
};

/**
 * Reads all markdown files in a directory and extracts front matter.
 * @param contentType Either "events" or "notices"
 */
export function getAllFrontMatter(
  contentType: "events" | "notices",
): FrontMatter[] {
  const dirPath = path.join(process.cwd(), "src/content", contentType);
  const files = fs.readdirSync(dirPath);

  const frontMatters: FrontMatter[] = files
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(dirPath, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);

      return {
        ...data,
        slug: file.replace(/\.mdx?$/, ""),
      } as FrontMatter;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return frontMatters;
}
