"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  Layers,
  Library,
  Menu,
  Rocket,
  Search,
  UserCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";

const iconMap = {
  home: Home,
  rocket: Rocket,
  library: Library,
  layers: Layers,
  user: UserCircle,
} as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navItems = siteConfig.navItems ?? [];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold text-gray-100">
          {siteConfig.name}
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-2 text-sm md:flex">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-gray-400 transition hover:bg-secondary hover:text-gray-100",
                  pathname === item.href && "bg-secondary text-gray-100"
                )}
              >
                {Icon ? <Icon className="h-4 w-4" /> : null}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            className="inline-flex h-9 w-9 items-center justify-center border border-border text-gray-100 transition hover:border-primary hover:text-primary"
          >
            <Search className="h-4 w-4" />
          </button>
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center border border-border text-gray-100 transition hover:border-primary hover:text-primary md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-border bg-black/40 backdrop-blur-md md:hidden"
          >
            <nav className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-4 text-sm">
              {navItems.map((item) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap];
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-2 text-gray-400 transition hover:bg-secondary hover:text-gray-100",
                      pathname === item.href && "bg-secondary text-gray-100"
                    )}
                  >
                    {Icon ? <Icon className="h-4 w-4" /> : null}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
