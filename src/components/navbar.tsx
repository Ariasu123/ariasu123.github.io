"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle"; 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, Copy, Check, Home, Rocket, Layers, User , Archive} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { SiteSearch } from "@/components/site-search"; // 引入搜索组件

// 定义接口，用于接收 props
interface PostMeta {
  slug: string;
  title: string;
  date: string;
}

const navItems = [
  { name: "Home", href: "/", icon: Home },          // 首页 -> Home
  { name: "Projects", href: "/projects", icon: Rocket }, // 项目实战 -> Projects
  { name: "Archive", href: "/archive", icon: Archive },
  { name: "Stack", href: "/stack", icon: Layers },    // 技术栈 -> Stack
  { name: "About", href: "/about", icon: User },      // 关于我 -> About
];

// 修改 Navbar 组件定义，接收 posts 属性
export function Navbar({ posts = [] }: { posts?: PostMeta[] }) {
  const pathname = usePathname();
  const [isCopied, setIsCopied] = useState(false);
  const email = "13484079700@163.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setIsCopied(true);
    toast.success("邮箱已复制！");
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 font-bold">
            <span>JtLe</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                <item.icon className="size-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          
          {/* --- 重点：把 posts 传给搜索组件 --- */}
          <SiteSearch posts={posts} />
          {/* -------------------------------- */}

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="default"
                size="sm"
                className="hidden h-8 rounded-full px-4 text-xs md:inline-flex"
              >
                <Mail className="mr-2 size-3.5" />
                Contact Me
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Get in touch</DialogTitle>
                <DialogDescription>
                  Feel free to reach out for collaborations.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2 py-4">
                <div className="grid flex-1 gap-2">
                  <Input
                    id="email"
                    defaultValue={email}
                    readOnly
                    className="h-9 bg-muted/50"
                  />
                </div>
                <Button type="submit" size="sm" className="px-3" onClick={handleCopy}>
                  {isCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex justify-center border-t pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:underline"
                  onClick={() => (window.location.href = `mailto:${email}`)}
                >
                  Open Mail App
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}