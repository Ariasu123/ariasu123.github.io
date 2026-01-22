"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { FileText, Search } from "lucide-react"
import { cn } from "@/lib/utils" // 引入 cn 工具方便合并样式

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

export function SiteSearch() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      {/* --- 1. 桌面端：Bilibili 风格的长条搜索框 --- */}
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className={cn(
          "relative h-9 w-full justify-between rounded-md bg-muted/50 px-4 text-sm font-normal text-muted-foreground shadow-none transition-colors hover:bg-muted/70 hover:text-foreground md:w-40 lg:w-64",
          "hidden md:inline-flex" // 只在电脑上显示这个长条
        )}
      >
        <span className="truncate">搜索...</span>
        {/* 图标在右侧，复刻 B 站布局 */}
        <Search className="ml-2 size-4 opacity-50" />
      </Button>

      {/* --- 2. 移动端：保持简约的小图标 (防止挤压 Logo) --- */}
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 px-0 text-muted-foreground hover:text-foreground md:hidden"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        <span className="sr-only">Search</span>
      </Button>

      {/* --- 3. 搜索弹窗内容 --- */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Recent Posts">
            {/* 这里的 slug 记得要和小写的文件名匹配 */}
            <CommandItem onSelect={() => runCommand(() => router.push("/posts/hello-world"))}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Hello World</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/posts/vibe-coding"))}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Why I Started Vibe Coding</span>
            </CommandItem>
             <CommandItem onSelect={() => runCommand(() => router.push("/posts/building-this-site"))}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Building this site</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}