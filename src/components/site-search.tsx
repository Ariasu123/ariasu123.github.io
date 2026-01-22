"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Calculator, Calendar, CreditCard, Settings, Smile, User, Rocket, Layers, FileText, Search } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

export function SiteSearch() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  // 监听 Cmd+K 或 Ctrl+K 快捷键
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

  // 选中后的回调
  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      {/* 1. 触发按钮 (Trigger) */}
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 px-0 text-muted-foreground hover:text-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        <span className="sr-only">Search</span>
      </Button>

      {/* 2. 搜索弹窗 (Dialog) */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {/* 分组一：导航 */}
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <Smile className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/projects"))}>
              <Rocket className="mr-2 h-4 w-4" />
              <span>Projects</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/stack"))}>
              <Layers className="mr-2 h-4 w-4" />
              <span>Tech Stack</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/about"))}>
              <User className="mr-2 h-4 w-4" />
              <span>About Me</span>
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator />

          {/* 分组二：最新文章 (这里暂时是硬编码的，后续可以换成真实数据) */}
          <CommandGroup heading="Recent Posts">
            <CommandItem onSelect={() => runCommand(() => router.push("/posts/hello-world"))}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Hello World</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/posts/vibe-coding"))}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Why I Started Vibe Coding</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* 分组三：系统功能 */}
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => runCommand(() => window.location.href = "mailto:13484079700@163.com")}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Contact Me</span>
              <CommandShortcut>⌘C</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}