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

export function SiteSearch() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const commandRef = React.useRef<HTMLDivElement>(null)

  // 监听点击外部，自动关闭下拉框
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
      {/* overflow-visible: 允许下拉菜单超出圆角边框显示
      */}
      <Command className="rounded-lg border bg-muted/50 overflow-visible">
        
        {/* 输入框区域 */}
        <div className="flex items-center pr-3">
            <CommandInput 
                placeholder="搜索..." 
                className="h-9 border-none bg-transparent focus:ring-0 outline-none [&_svg]:hidden pl-3" 
                // [&_svg]:hidden -> 隐藏默认的左侧放大镜
                // pl-3 -> 让文字靠左对齐 (去掉原本给图标留的左边距)
                onFocus={() => setOpen(true)} 
            />
            {/* 我们自定义的右侧图标 */}
            <Search className="size-4 shrink-0 opacity-50 text-muted-foreground" />
        </div>

        {/* 搜索结果下拉框 (悬浮层) */}
        {open && (
          <div className="absolute top-[calc(100%+6px)] left-0 w-full rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
             <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Recent Posts">
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
          </div>
        )}
      </Command>
    </div>
  )
}