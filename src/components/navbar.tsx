"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle"; // 根据你的截图，你用的是这个组件
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, Copy, Check, Search, Home, Rocket, Layers, User } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// 定义导航链接
const navItems = [
  { name: "首页", href: "/", icon: Home },
  { name: "项目实战", href: "/projects", icon: Rocket },
  { name: "技术栈", href: "/stack", icon: Layers },
  { name: "关于我", href: "/about", icon: User },
];

export function Navbar() {
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
        {/* Logo 区域 */}
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 font-bold">
            <span>JtLe</span>
          </Link>
          
          {/* 桌面端导航 */}
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

        {/* 右侧功能区 */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* 搜索按钮 (装饰用) */}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Search className="size-4" />
            <span className="sr-only">Search</span>
          </Button>

          {/* --- Contact Me 弹窗 --- */}
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
                  variant="link"
                  size="sm"
                  className="text-muted-foreground"
                  onClick={() => (window.location.href = `mailto:${email}`)}
                >
                  Open Mail App
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          {/* --- 弹窗结束 --- */}

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}