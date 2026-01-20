import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
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
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Latest posts
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              A running list of notes, essays, and build logs.
            </p>
          </header>
        </FadeIn>
        <div className="grid gap-6">
          {posts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No posts found. Add MDX files to `content/posts`.
            </p>
          ) : (
            posts.map((post, index) => (
              <FadeIn key={post.slug} delay={index * 0.05}>
                <article className="border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_0_16px_rgba(255,79,216,0.18)]">
                  <div className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      {formatDate(post.date)}
                    </p>
                    <h2 className="text-lg font-semibold text-foreground">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {post.description}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
