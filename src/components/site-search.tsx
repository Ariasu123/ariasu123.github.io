"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { FileText, Search, CalendarIcon } from "lucide-react"
import { formatDate } from "@/lib/utils" // 引入刚才添加的日期工具

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface PostMeta {
  slug: string
  title: string
  date: string
}

export function SiteSearch({ posts = [] }: { posts?: PostMeta[] }) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const commandRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <div ref={commandRef} className="relative w-full max-w-sm md:w-72 z-50 group">
      <Command
        className="rounded-xl border bg-muted/40 overflow-visible transition-colors group-hover:bg-muted/60 group-focus-within:bg-background group-focus-within:shadow-sm"
        filter={(value, search) => {
           if (value.toLowerCase().includes(search.toLowerCase())) return 1
           return 0
        }}
      >
        <div className="flex items-center pr-3 pl-4 relative">
            <Search className="size-4 shrink-0 text-muted-foreground absolute left-4 pointer-events-none" />
            <CommandInput
                ref={inputRef}
                placeholder=""
                className="h-10 border-none bg-transparent focus:ring-0 outline-none pl-8 pr-2 text-sm placeholder:text-muted-foreground/60 [&_svg]:hidden"
                onFocus={() => setOpen(true)}
            />
        </div>

        {/* 下拉框悬浮层 */}
        {open && (
          <div className="absolute top-[calc(100%+8px)] left-0 w-full p-1 rounded-xl border bg-popover/95 backdrop-blur-sm text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95 ring-1 ring-border/50">
             <CommandList className="max-h-[300px] overflow-y-auto py-1 px-1">
                <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </CommandEmpty>

                {posts.length > 0 && (
                  <CommandGroup
                    heading="Blog Posts"
                    // 自定义分组标题样式：小写、灰色、增加字间距
                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground/70 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:uppercase"
                  >
                    {posts.map((post) => (
                      <CommandItem
                        key={post.slug}
                        value={post.title}
                        onSelect={() => runCommand(() => router.push(`/blog/${post.slug}`))}
                        // 自定义列表项样式：增加内边距，圆角，优化选中状态背景色
                        className="flex items-center justify-between gap-2 px-3 py-2.5 my-1 rounded-lg cursor-pointer aria-selected:bg-accent/60 data-[selected=true]:bg-accent/60 transition-colors"
                      >
                        {/* 左侧：图标和标题 */}
                        <div className="flex items-center gap-3 overflow-hidden">
                          {/* 给图标加一个柔和的背景座 */}
                          <div className="flex shrink-0 items-center justify-center size-8 rounded-full bg-muted/80">
                            <FileText className="size-4 text-foreground/70" />
                          </div>
                          <span className="truncate font-medium text-foreground/90">{post.title}</span>
                        </div>

                        {/* 右侧：日期显示 */}
                        <div className="flex items-center gap-1.5 shrink-0 text-xs text-muted-foreground/60 ml-2">
                          <CalendarIcon className="size-3" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
             </CommandList>
          </div>
        )}
      </Command>
    </div>
  )
}