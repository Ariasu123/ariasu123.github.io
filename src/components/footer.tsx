import Link from "next/link";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { href: "https://github.com/your-handle", label: "GitHub" },
  { href: "https://twitter.com/your-handle", label: "Twitter" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-3 px-6 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <p>Copyright © {year} {siteConfig.name}. All rights reserved.</p>
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
    </footer>
  );
}
