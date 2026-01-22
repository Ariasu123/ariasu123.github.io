import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { HeroParallax } from "@/components/hero-parallax";
import { SpotlightCard } from "@/components/spotlight-card";
import { formatDate } from "@/lib/format";
import { getRecentPosts } from "@/lib/posts";

export default function Home() {
  const posts = getRecentPosts(3);

  return (
    <main className="min-h-screen bg-neutral-900">
      <HeroParallax title="I am Ariasu" scrollTargetId="content-start" />

      <div className="relative z-10 -mt-24 pb-24">
        <div
          id="content-start"
          className="mx-auto w-full max-w-4xl rounded-t-3xl bg-background px-6 pt-10 shadow-2xl"
        >
          <FadeIn>
            <section className="space-y-6 pb-12">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-semibold tracking-tight text-gray-100">
                  Recent Posts
                </h2>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-muted-foreground transition hover:text-primary"
                >
                  View all posts
                </Link>
              </div>
              {posts.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No posts yet. Start by writing your first MDX article.
                </p>
              ) : (
                <div className="grid gap-6">
                  {posts.map((post, index) => (
                    <FadeIn key={post.slug} delay={index * 0.06}>
                      <SpotlightCard className="border border-border bg-black/40 p-6 backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-[0_0_18px_rgba(255,255,255,0.08)]">
                        <div className="space-y-2">
                          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                            {formatDate(post.date)}
                          </p>
                          <h3 className="text-lg font-semibold text-gray-100">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="hover:underline"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-muted-foreground">
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
