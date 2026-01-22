import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { FadeIn } from "@/components/fade-in";
import { mdxComponents } from "@/components/mdx-components";
import { formatDate } from "@/lib/format";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

type PostPageProps = {
  params: {
    slug: string;
  };
};

const prettyCodeOptions = {
  theme: { dark: "laserwave", light: "github-light" },
  keepBackground: false,
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {};
  }

  const { meta } = post;
  const url = `${siteConfig.url}/blog/${meta.slug}`;
  const ogImage = meta.coverImage
    ? new URL(meta.coverImage, siteConfig.url).toString()
    : undefined;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: meta.title,
      description: meta.description,
      siteName: siteConfig.name,
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default function BlogPostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-16">
      <article className="space-y-10">
        <FadeIn>
          <header className="space-y-3">
            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground transition hover:text-primary"
            >
              Back to blog
            </Link>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {post.meta.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {formatDate(post.meta.date)}
            </p>
            <p className="text-base text-muted-foreground">
              {post.meta.description}
            </p>
          </header>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="prose max-w-none">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
                },
              }}
            />
          </div>
        </FadeIn>
      </article>
    </main>
  );
}
