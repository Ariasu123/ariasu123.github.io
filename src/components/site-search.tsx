"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { FileText, Search } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

// 定义一个简单的接口，或者使用 import type { PostMeta } from "@/lib/posts"
interface PostMeta {
  slug: string
  title: string
  date: string
  // 其他字段这里暂时用不到
}

export function SiteSearch({ posts = [] }: { posts?: PostMeta[] }) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const commandRef = React.useRef<HTMLDivElement>(null)

  // 监听点击外部关闭
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
    <div ref={commandRef} className="relative w-full max-w-sm md:w-64 z-50">
      <Command 
        className="rounded-lg border bg-muted/50 overflow-visible"
        // 关键：加上 filter 属性，防止因为某些特殊字符导致搜索匹配失败
        filter={(value, search) => {
           if (value.toLowerCase().includes(search.toLowerCase())) return 1
           return 0
        }}
      >
        <div className="flex items-center pr-3">
            <CommandInput 
                placeholder="搜索文章..." 
                className="h-9 border-none bg-transparent focus:ring-0 outline-none [&_svg]:hidden pl-3" 
                onFocus={() => setOpen(true)} 
            />
            <Search className="size-4 shrink-0 opacity-50 text-muted-foreground" />
        </div>

        {open && (
          <div className="absolute top-[calc(100%+6px)] left-0 w-full rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
             <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Posts">
                  {/* --- 重点：这里开始遍历传入的 posts 数组 --- */}
                  {posts.map((post) => (
                    <CommandItem 
                      key={post.slug} 
                      value={post.title} // 这个 value 是用于搜索匹配的关键词
                      onSelect={() => runCommand(() => router.push(`/posts/${post.slug}`))}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      <span>{post.title}</span>
                    </CommandItem>
                  ))}
                  {/* --------------------------------------- */}
                </CommandGroup>
             </CommandList>
          </div>
        )}
      </Command>
    </div>
  )
}