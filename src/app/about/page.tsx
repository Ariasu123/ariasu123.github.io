import Image from "next/image";
import { FadeIn } from "@/components/fade-in";

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-24">
      <FadeIn>
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold text-foreground">About Me</h1>
          <p className="text-base text-muted-foreground">
            This section is under construction.
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section className="mt-10 grid gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="relative h-72 w-full overflow-hidden rounded-xl border border-border bg-gray-800/50 backdrop-blur-md">
            <Image
              src="/avatar.jpg"
              alt="Ariasu portrait"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 360px, 100vw"
            />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">
                Introduction
              </h2>
              <div className="space-y-3 text-base text-muted-foreground">
                <p>
                  我是 Ariasu。就读于华中科技大学集成电路学院，研一学生。
                </p>
                <p>
                  一名正在探索 AI 编程边界的开发者 (Vibe Coder)。 在这个
                  &quot;数字荒原&quot; 里，我致力于通过 AI 辅助工具将想法转化为现实。我不只是在写代码，更是在与
                  AI 的结对编程中寻找新的创造力范式。
                </p>
                <p>这个博客是我记录学习的据点。</p>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Skills</h2>
              <ul className="list-disc space-y-1 pl-5 text-base text-muted-foreground">
                <li>Vibe Coding: Cursor, Claude, Codex</li>
                <li>AI Stack: LangChain, LLM Integration, Prompt Engineering</li>
                <li>Tools: Git, cc-switch</li>
              </ul>
            </div>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}
