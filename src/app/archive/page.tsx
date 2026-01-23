import Link from "next/link";
import { getAllPosts, type PostMeta } from "@/lib/posts";
import { Archive } from "lucide-react";

export const metadata = {
  title: "Archive",
  description: "A chronological list of all my posts.",
};

export default function ArchivePage() {
  const posts = getAllPosts();

  // --- 核心逻辑：按年份分组 ---
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<number, PostMeta[]>);

  // 获取所有年份并倒序排列 (2026, 2025, ...)
  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  // 日期格式化工具 (只显示 MM-DD)
  const formatDateSimple = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    }).replace(/\//g, "-"); // 将 01/20 变成 01-20
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24">
      {/* 头部标题 */}
      <div className="mb-16 flex flex-col items-start gap-4">
        <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted/50">
                 <Archive className="size-5" />
            </div>
            <span className="font-mono text-sm uppercase tracking-wider">Timeline</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Archive
        </h1>
        <p className="text-lg text-muted-foreground">
        <span className="font-medium text-foreground">{posts.length}</span> posts in total.
        </p>
      </div>

      {/* 年份列表 */}
      <div className="space-y-16">
        {years.map((year) => (
          <section key={year} className="relative">
            {/* 年份大标题 */}
            <h2 className="mb-8 select-none text-6xl font-bold text-muted/20 md:absolute md:-left-24 md:text-8xl md:font-black md:text-muted/10">
              {year}
            </h2>
            
            {/* 移动端年份显示 (在内容上方) */}
            <div className="mb-6 flex items-center gap-4 md:hidden">
                 <span className="text-2xl font-bold">{year}</span>
                 <div className="h-px flex-1 bg-border"></div>
            </div>

            {/* 文章列表 */}
            <ul className="space-y-4">
              {postsByYear[year].map((post) => (
                <li key={post.slug} className="group relative flex items-baseline gap-6 transition-opacity hover:opacity-100">
                  {/* 日期 (01-20) */}
                  <time 
                    dateTime={post.date} 
                    className="shrink-0 font-mono text-sm text-muted-foreground/60 transition-colors group-hover:text-accent-foreground"
                  >
                    {formatDateSimple(post.date)}
                  </time>

                  {/* 标题 */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex-1 truncate font-medium text-foreground/80 transition-colors hover:text-primary group-hover:underline group-hover:underline-offset-4"
                  >
                    {post.title}
                  </Link>

                  {/* 装饰性的小圆点 (可选) */}
                  <div className="hidden size-1.5 rounded-full bg-muted-foreground/20 group-hover:bg-primary md:block" />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}