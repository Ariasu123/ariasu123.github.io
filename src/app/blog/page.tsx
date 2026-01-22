import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { SpotlightCard } from "@/components/spotlight-card";
import { formatDate } from "@/lib/format";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-16">
      <div className="space-y-10">
        <FadeIn>
          <header className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Blog
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              Latest posts
            </h1>
            <p className="max-w-2xl text-base text-gray-600 dark:text-gray-400">
              A running list of notes, essays, and build logs.
            </p>
          </header>
        </FadeIn>
        <div className="grid gap-6">
          {posts.length === 0 ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No posts found. Add MDX files to `content/posts`.
            </p>
          ) : (
            posts.map((post, index) => (
              <FadeIn key={post.slug} delay={index * 0.05}>
                <SpotlightCard className="border-b border-gray-100 bg-transparent px-0 py-5 transition hover:bg-gray-50 last:border-0 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                  <div className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400">
                      {formatDate(post.date)}
                    </p>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {post.description}
                    </p>
                  </div>
                </SpotlightCard>
              </FadeIn>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
