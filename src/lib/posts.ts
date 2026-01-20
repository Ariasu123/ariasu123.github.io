import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

export function getAllPosts(): PostMeta[] {
  const dateValue = (date: string) => {
    const value = new Date(date).getTime();
    return Number.isNaN(value) ? 0 : value;
  };

  return getPostSlugs()
    .map((slug) => {
      const fullPath = path.join(postsDirectory, `${slug}.mdx`);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const tags = Array.isArray(data.tags)
        ? data.tags.filter((tag): tag is string => typeof tag === "string")
        : typeof data.tags === "string"
        ? data.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [];

      return {
        slug,
        title: typeof data.title === "string" ? data.title : slug,
        description: typeof data.description === "string" ? data.description : "",
        date: typeof data.date === "string" ? data.date : "",
        tags,
        coverImage: typeof data.coverImage === "string" ? data.coverImage : undefined,
      };
    })
    .sort((a, b) => dateValue(b.date) - dateValue(a.date));
}

export function getRecentPosts(limit = 3): PostMeta[] {
  return getAllPosts().slice(0, limit);
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const tags = Array.isArray(data.tags)
    ? data.tags.filter((tag): tag is string => typeof tag === "string")
    : typeof data.tags === "string"
    ? data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  return {
    meta: {
      slug,
      title: typeof data.title === "string" ? data.title : slug,
      description: typeof data.description === "string" ? data.description : "",
      date: typeof data.date === "string" ? data.date : "",
      tags,
      coverImage: typeof data.coverImage === "string" ? data.coverImage : undefined,
    },
    content,
  };
}
