"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Home,
  Layers,
  Library,
  Mail,
  Menu,
  Copy,
  Rocket,
  Search,
  UserCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const email = "13484079700@163.com";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }

    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
      toast.success("Email copied to clipboard!");
      copyTimeoutRef.current = setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast.error("Unable to copy email.");
    }
  };

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
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="default"
                className="hidden rounded-full md:inline-flex"
              >
                <Mail className="mr-2 size-3.5" />
                Contact Me
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader className="space-y-2">
                <DialogTitle>Get in touch</DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Feel free to reach out for collaborations or just a chat about
                  Vibe Coding.
                </p>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input readOnly value={email} />
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={handleCopy}
                    aria-label="Copy email"
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    window.location.href = `mailto:${email}`;
                  }}
                  className="w-full"
                >
                  Open Mail App
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
