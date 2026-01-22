import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { HeroParallax } from "@/components/hero-parallax";
import { SpotlightCard } from "@/components/spotlight-card";
import { formatDate } from "@/lib/format";
import { getRecentPosts } from "@/lib/posts";

export default function Home() {
  const posts = getRecentPosts(3);

  return (
    <main className="min-h-screen bg-background">
      <HeroParallax scrollTargetId="content-start" />

      <div className="relative z-10 -mt-24 pb-24">
        <div
          id="content-start"
          className="mx-auto w-full max-w-4xl rounded-t-3xl border border-gray-200 bg-white px-6 pt-10 shadow-sm dark:border-white/10 dark:bg-neutral-900/50"
        >
          <FadeIn>
            <section className="space-y-6 pb-12">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                  Recent Posts
                </h2>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  View all posts
                </Link>
              </div>
              {posts.length === 0 ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  No posts yet. Start by writing your first MDX article.
                </p>
              ) : (
                <div className="grid">
                  {posts.map((post, index) => (
                    <FadeIn key={post.slug} delay={index * 0.06}>
                      <SpotlightCard className="border-b border-gray-100 bg-transparent px-0 py-5 transition hover:bg-gray-50 last:border-0 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                        <div className="space-y-2">
                          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400">
                            {formatDate(post.date)}
                          </p>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="hover:underline"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {post.description}
                          </p>
                        </div>
                      </SpotlightCard>
                    </FadeIn>
                  ))}
                </div>
              )}
            </section>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
