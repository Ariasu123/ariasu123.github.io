"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { FileText, Search } from "lucide-react" // 只保留用到的图标

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
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
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 px-0 text-muted-foreground hover:text-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        <span className="sr-only">Search</span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search posts..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {/* 只保留最近文章，或者你以后接真实的搜索结果 */}
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
      </CommandDialog>
    </>
  )
}