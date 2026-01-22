import {
  Blocks,
  Bot,
  Brain,
  Cloud,
  GitBranch,
  Layers,
  Palette,
  SlidersHorizontal,
  Sparkles,
  Terminal,
} from "lucide-react";
import { FadeIn } from "@/components/fade-in";

export default function StackPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-24">
      <FadeIn>
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold text-gray-100">
            My Digital Arsenal
          </h1>
          <p className="text-base text-gray-400">
            The tools and technologies I use to build in the digital wilderness.
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section className="mt-10 grid gap-4 md:grid-cols-6">
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6 md:col-span-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              AI &amp; Vibe Coding (My Core)
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-black/40 text-primary">
                  <Terminal className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-100">Cursor</p>
                  <p className="text-sm text-gray-400">
                    The AI-first code editor.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-black/40 text-primary">
                  <Brain className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-100">
                    Claude 3.5 Sonnet
                  </p>
                  <p className="text-sm text-gray-400">
                    Primary reasoning engine.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-black/40 text-primary">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-100">
                    LangChain
                  </p>
                  <p className="text-sm text-gray-400">
                    Building LLM-powered applications.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-black/40 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-100">
                    Prompt Engineering
                  </p>
                  <p className="text-sm text-gray-400">
                    Crafting context for better outputs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6 md:col-span-2">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Modern Web Stack
            </div>
            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-black/40 text-primary">
                  <Blocks className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-100">
                    Next.js 14
                  </p>
                  <p className="text-sm text-gray-400">
                    App Router &amp; Server Components.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-black/40 text-primary">
                  <Palette className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-100">
                    Tailwind CSS
                  </p>
                  <p className="text-sm text-gray-400">
                    Utility-first styling.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-black/40 text-primary">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-100">
                    Shadcn UI
                  </p>
                  <p className="text-sm text-gray-400">
                    Accessible component library.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6 md:col-span-6">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Workflow &amp; Tools
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-black/40 text-primary">
                  <SlidersHorizontal className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-100">cc-switch</p>
                  <p className="text-sm text-gray-400">
                    My tool for managing AI assistant configs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-black/40 text-primary">
                  <GitBranch className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-100">
                    Git &amp; GitHub
                  </p>
                  <p className="text-sm text-gray-400">Version control.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-black/40 text-primary">
                  <Cloud className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-100">Vercel</p>
                  <p className="text-sm text-gray-400">
                    Deployment &amp; Hosting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}
