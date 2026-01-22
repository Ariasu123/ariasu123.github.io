import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { SiteStats } from "@/components/site-stats";

const footerLinks = [
  { href: "https://github.com/Ariasu123", label: "GitHub" },
  // 如果没有 Twitter，可以暂时注释掉下面这行，或者换成 Bilibili/Email
  // { href: "https://twitter.com/your-handle", label: "Twitter" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-muted-foreground sm:flex-row">
        
        {/* 左侧：版权信息 */}
        <p>Copyright © {year} {siteConfig.name}. All rights reserved.</p>

        {/* 右侧：统计数据 + 社交链接 */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          {/* 1. 访问量统计 (自动加载不蒜子) */}
          <SiteStats />

          {/* 2. 社交链接 */}
          <div className="flex items-center gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        
      </div>
    </footer>
  );
}