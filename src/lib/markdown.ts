import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Defines the shape of the front matter in your markdown files.
 */
export type FrontMatter = {
  title: string;
  date: string;
  slug: string;
  [key: string]: any;
};

/**
 * Defines the shape of a full post, containing both the parsed
 * front matter and the raw markdown content.
 */
export type Post = {
  content: string;
  fm: FrontMatter;
};

// --- Function Implementations ---

/**
 * Reads all markdown files in a directory and extracts only the front matter.
 * This is efficient for creating list pages (e.g., a list of all events)
 * where the full content is not needed.
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
      const { data } = matter(raw); // Only parse data, ignore content for efficiency

      return {
        ...data,
        slug: file.replace(/\.mdx?$/, ""),
      } as FrontMatter;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return frontMatters;
}

/**
 * Reads all markdown files in a directory and extracts both the front matter
 * and the full markdown content. This is used when you need to render a
 * complete page for a single event or notice.
 * @param contentType Either "events" or "notices"
 */
export function getAllPosts(contentType: "events" | "notices"): Post[] {
  const dirPath = path.join(process.cwd(), "src/content", contentType);
  const files = fs.readdirSync(dirPath);

  const posts: Post[] = files
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(dirPath, file);
      const raw = fs.readFileSync(filePath, "utf-8");

      // Use gray-matter to parse the file into front matter (data) and content
      const { data, content } = matter(raw);

      return {
        fm: {
          ...data,
          slug: file.replace(/\.mdx?$/, ""),
        } as FrontMatter,
        content,
      };
    })
    .sort(
      (a, b) => new Date(b.fm.date).getTime() - new Date(a.fm.date).getTime(),
    );

  return posts;
}

/**
 * Retrieves a single post by its slug from the specified content type directory.
 * @param contentType Either "events" or "notices"
 * @param slug The slug of the post to retrieve (without file extension)
 * @returns The Post object if found, otherwise undefined.
 */
export function getSinglePost(
  contentType: "events" | "notices",
  slug: string,
): Post | undefined {
  const contentDir = path.join(process.cwd(), "src/content", contentType);

  // Define potential file paths for both .md and .mdx extensions
  const mdPath = path.join(contentDir, `${slug}.md`);
  const mdxPath = path.join(contentDir, `${slug}.mdx`);

  let filePath: string;

  // Check which file exists and set the correct path
  if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  } else if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else {
    // If neither file is found, return undefined
    return undefined;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    fm: {
      ...data,
      slug,
    } as FrontMatter,
    content,
  };
}

/**
 * Retrieves a specified number of the most recent posts.
 * This function is optimized to only parse front matter, making it fast.
 * @param contentType Either "events" or "notices"
 * @param count The number of recent items to return
 */
export function getRecentEvents(
  contentType: "events" | "notices",
  count: number,
): FrontMatter[] {
  // getAllFrontMatter already sorts posts by date descending,
  // so we just need to get the first 'count' items.
  return getAllFrontMatter(contentType).slice(0, count);
}
