import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

function MdxLink({ className, ...props }: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className={cn(
        "font-medium text-primary underline underline-offset-4",
        className
      )}
      {...props}
    />
  );
}

export const mdxComponents: MDXComponents = {
  a: MdxLink,
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "!bg-zinc-950 !text-zinc-50 border border-zinc-800",
        className
      )}
      {...props}
    />
  ),
};
